import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "You must be signed in" }, { status: 401 });
	}

	try {
		const { db } = await connectToDatabase();
		const membership = await db.collection("memberships").findOne({ userId });
		return NextResponse.json(membership || null);
	} catch (err) {
		console.error("Error in GET /api/womens-soccer/membership:", err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
