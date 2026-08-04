import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/mongodb";
import { getTierByPriceId } from "@/lib/membership";

export async function POST(request: Request) {
	const sig = request.headers.get("stripe-signature");
	const body = await request.text();
	if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });
	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		return NextResponse.json({ error: "Secret missing" }, { status: 500 });
	}

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error("Webhook signature verification failed", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	const { db } = await connectToDatabase();

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				if (session.mode !== "subscription") break;

				const userId = session.client_reference_id || session.metadata?.userId;
				const tierId = session.metadata?.tierId;
				const tshirtSize = session.metadata?.tshirtSize || undefined;
				const subscriptionId = session.subscription as string;
				const customerId = session.customer as string;

				if (!userId || !tierId || !subscriptionId) break;

				const subscription = await stripe.subscriptions.retrieve(subscriptionId);

				await db.collection("memberships").updateOne(
					{ userId },
					{
						$set: {
							userId,
							tier: tierId,
							tshirtSize,
							stripeCustomerId: customerId,
							stripeSubscriptionId: subscriptionId,
							status: subscription.status,
							cancelAtPeriodEnd: subscription.cancel_at_period_end,
							currentPeriodEnd: new Date(subscription.current_period_end * 1000),
							scheduledTierId: null,
							updatedAt: new Date(),
						},
						$setOnInsert: { createdAt: new Date() },
					},
					{ upsert: true }
				);
				break;
			}

			case "customer.subscription.updated": {
				const subscription = event.data.object as Stripe.Subscription;
				const userId = subscription.metadata?.userId;
				if (!userId) break;

				const priceId = subscription.items.data[0]?.price.id;
				const tier = priceId ? getTierByPriceId(priceId) : undefined;

				const update: Record<string, unknown> = {
					status: subscription.status,
					cancelAtPeriodEnd: subscription.cancel_at_period_end,
					currentPeriodEnd: new Date(subscription.current_period_end * 1000),
					updatedAt: new Date(),
				};

				if (tier) {
					const existing = await db.collection("memberships").findOne({ userId });
					// Only treat this as "the tier changed" if the active price differs from
					// what we already have on record. Attaching/updating a subscription
					// schedule (e.g. to set up a future downgrade) also fires this event
					// without actually changing the active price yet — don't clobber the
					// pending scheduledTierId in that case.
					if (!existing || existing.tier !== tier.id) {
						update.tier = tier.id;
						update.scheduledTierId = null;
						update.scheduledTshirtSize = null;
						if (existing?.scheduledTshirtSize) {
							update.tshirtSize = existing.scheduledTshirtSize;
						}
					}
				}

				await db.collection("memberships").updateOne({ userId }, { $set: update });
				break;
			}

			case "customer.subscription.deleted": {
				const subscription = event.data.object as Stripe.Subscription;
				const userId = subscription.metadata?.userId;
				if (!userId) break;

				await db.collection("memberships").updateOne(
					{ userId },
					{ $set: { status: "canceled", cancelAtPeriodEnd: false, updatedAt: new Date() } }
				);
				break;
			}

			default:
				break;
		}
	} catch (err) {
		console.error(`Error handling webhook event ${event.type}:`, err);
		return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
	}

	return NextResponse.json({ received: true });
}
