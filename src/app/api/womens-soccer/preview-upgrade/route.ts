import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/mongodb";
import { getTierById } from "@/lib/membership";

export async function POST(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
	}

	const { tierId } = (await request.json()) as { tierId?: string };
	const newTier = tierId ? getTierById(tierId) : undefined;
	if (!newTier || !newTier.priceId) {
		return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
	}

	try {
		const { db } = await connectToDatabase();
		const membership = await db.collection("memberships").findOne({ userId });
		if (!membership || !membership.stripeSubscriptionId) {
			return NextResponse.json({ error: "No active membership found" }, { status: 404 });
		}

		const subscription = await stripe.subscriptions.retrieve(membership.stripeSubscriptionId);
		const currentItem = subscription.items.data[0];

		const preview = await stripe.invoices.createPreview({
			subscription: membership.stripeSubscriptionId,
			subscription_details: {
				items: [{ id: currentItem.id, price: newTier.priceId }],
				proration_behavior: "none",
				billing_cycle_anchor: "now",
			},
		});

		return NextResponse.json({ amountDue: preview.amount_due / 100, currency: preview.currency });
	} catch (err) {
		console.error("Error in POST /api/womens-soccer/preview-upgrade:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
