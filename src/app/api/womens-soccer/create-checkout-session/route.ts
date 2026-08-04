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

	const { tierId, tshirtSize } = await request.json();
	const tier = getTierById(tierId);
	if (!tier) {
		return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
	}
	if (!tier.priceId) {
		return NextResponse.json(
			{ error: "This tier is not yet configured for checkout" },
			{ status: 500 }
		);
	}
	if (tier.hasTshirt && !tshirtSize) {
		return NextResponse.json({ error: "T-shirt size is required" }, { status: 400 });
	}

	const origin = request.headers.get("origin") || "http://localhost:3000";

	try {
		const { db } = await connectToDatabase();
		const existing = await db.collection("memberships").findOne({ userId });
		if (existing && existing.status === "active") {
			return NextResponse.json(
				{ error: "You already have an active membership. Manage it instead of buying a new one." },
				{ status: 400 }
			);
		}

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [{ price: tier.priceId, quantity: 1 }],
			success_url: `${origin}/womens-soccer/membership?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/womens-soccer/membership?cancel=true`,
			customer_email: undefined,
			client_reference_id: userId,
			subscription_data: {
				metadata: { userId, tierId: tier.id, tshirtSize: tshirtSize || "" },
			},
			metadata: { userId, tierId: tier.id, tshirtSize: tshirtSize || "" },
		});

		return NextResponse.json({ url: session.url });
	} catch (err) {
		console.error("Error in POST /api/womens-soccer/create-checkout-session:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
