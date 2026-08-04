import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const sessionId = searchParams.get("sessionId");
	if (!sessionId) {
		return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		if (session.client_reference_id !== userId) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}
		return NextResponse.json(session);
	} catch (err) {
		console.error("Error retrieving checkout session:", err);
		return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
	}
}
