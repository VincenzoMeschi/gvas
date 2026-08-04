import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/mongodb";
import { getTierById, isUpgrade } from "@/lib/membership";

type ManageAction = "upgrade" | "downgrade" | "cancel" | "reactivate" | "cancel_scheduled_downgrade";

export async function POST(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
	}

	const { action, tierId, tshirtSize } = (await request.json()) as {
		action: ManageAction;
		tierId?: string;
		tshirtSize?: string;
	};

	try {
		const { db } = await connectToDatabase();
		const membership = await db.collection("memberships").findOne({ userId });
		if (!membership || !membership.stripeSubscriptionId) {
			return NextResponse.json({ error: "No active membership found" }, { status: 404 });
		}

		const subscription = await stripe.subscriptions.retrieve(membership.stripeSubscriptionId);
		const currentItem = subscription.items.data[0];
		const existingScheduleId = subscription.schedule as string | null;

		if (action === "cancel") {
			if (existingScheduleId) {
				// A schedule (from a prior downgrade) is attached — cancellation must be
				// expressed by telling the schedule to cancel the subscription once its
				// current phase ends, rather than updating the subscription directly.
				await stripe.subscriptionSchedules.update(existingScheduleId, {
					end_behavior: "cancel",
				});
			} else {
				await stripe.subscriptions.update(membership.stripeSubscriptionId, {
					cancel_at_period_end: true,
				});
			}
			await db.collection("memberships").updateOne(
				{ userId },
				{ $set: { cancelAtPeriodEnd: true, updatedAt: new Date() } }
			);
			return NextResponse.json({ success: true });
		}

		if (action === "reactivate") {
			if (existingScheduleId) {
				await stripe.subscriptionSchedules.update(existingScheduleId, {
					end_behavior: "release",
				});
			} else {
				await stripe.subscriptions.update(membership.stripeSubscriptionId, {
					cancel_at_period_end: false,
				});
			}
			await db.collection("memberships").updateOne(
				{ userId },
				{ $set: { cancelAtPeriodEnd: false, updatedAt: new Date() } }
			);
			return NextResponse.json({ success: true });
		}

		if (action === "cancel_scheduled_downgrade") {
			if (!existingScheduleId) {
				return NextResponse.json({ error: "No scheduled downgrade to cancel" }, { status: 400 });
			}
			// Releasing the schedule immediately hands full control back to the plain
			// subscription, discarding the pending phase change and keeping the member
			// on their current tier with no further scheduled changes.
			await stripe.subscriptionSchedules.release(existingScheduleId);
			await db.collection("memberships").updateOne(
				{ userId },
				{ $set: { scheduledTierId: null, scheduledTshirtSize: null, updatedAt: new Date() } }
			);
			return NextResponse.json({ success: true });
		}

		if (action === "upgrade" || action === "downgrade") {
			if (!tierId) {
				return NextResponse.json({ error: "tierId is required" }, { status: 400 });
			}
			const newTier = getTierById(tierId);
			if (!newTier || !newTier.priceId) {
				return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
			}
			if (newTier.hasTshirt && !tshirtSize && !membership.tshirtSize) {
				return NextResponse.json({ error: "T-shirt size is required" }, { status: 400 });
			}

			const goingUp = isUpgrade(membership.tier, newTier.id);

			if (action === "upgrade" && !goingUp) {
				return NextResponse.json(
					{ error: "Selected tier is not an upgrade from your current tier" },
					{ status: 400 }
				);
			}
			if (action === "downgrade" && goingUp) {
				return NextResponse.json(
					{ error: "Selected tier is not a downgrade from your current tier" },
					{ status: 400 }
				);
			}

			if (action === "upgrade") {
				// Upgrades charge the FULL price of the new tier today (no proration credit
				// for unused time on the old tier) and reset the renewal date to today —
				// i.e. the member gets a fresh 12-month cycle starting now. This also
				// overrides any pending scheduled downgrade/cancellation. If a schedule is
				// attached, release it first so the subscription can be updated directly
				// (Stripe forbids updating items or cancel_at_period_end on a subscription
				// while a schedule owns it).
				if (existingScheduleId) {
					await stripe.subscriptionSchedules.release(existingScheduleId);
				}
				await stripe.subscriptions.update(membership.stripeSubscriptionId, {
					items: [{ id: currentItem.id, price: newTier.priceId }],
					proration_behavior: "none",
					billing_cycle_anchor: "now",
					cancel_at_period_end: false,
				});
				await db.collection("memberships").updateOne(
					{ userId },
					{
						$set: {
							tier: newTier.id,
							tshirtSize: tshirtSize || membership.tshirtSize,
							cancelAtPeriodEnd: false,
							scheduledTierId: null,
							updatedAt: new Date(),
						},
					}
				);
				return NextResponse.json({ success: true });
			}

			// Downgrade: schedule the tier change to take effect at the next renewal.
			const periodEnd = subscription.current_period_end;

			let scheduleId = existingScheduleId;
			if (!scheduleId) {
				const schedule = await stripe.subscriptionSchedules.create({
					from_subscription: membership.stripeSubscriptionId,
				});
				scheduleId = schedule.id;
			}

			await stripe.subscriptionSchedules.update(scheduleId, {
				end_behavior: "release",
				phases: [
					{
						items: [{ price: currentItem.price.id, quantity: 1 }],
						start_date: subscription.current_period_start,
						end_date: periodEnd,
					},
					{
						items: [{ price: newTier.priceId, quantity: 1 }],
						start_date: periodEnd,
						iterations: 1,
					},
				],
			});

			await db.collection("memberships").updateOne(
				{ userId },
				{
					$set: {
						scheduledTierId: newTier.id,
						scheduledTshirtSize: tshirtSize || membership.tshirtSize,
						cancelAtPeriodEnd: false,
						updatedAt: new Date(),
					},
				}
			);
			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ error: "Unknown action" }, { status: 400 });
	} catch (err) {
		console.error("Error in POST /api/womens-soccer/manage:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
