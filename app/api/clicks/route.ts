import { NextResponse, NextRequest } from "next/server";
import { connectToMongoDB } from "../../../lib/db";

export async function POST(req: NextRequest) {
	try {
		const { phone, clicked, lender } = await req.json();
		const conn = await connectToMongoDB();
		if (!conn?.db) throw new Error("Failed to connect to MongoDB");

		const res = {
			phone: phone,
			date: new Date(),
			clicked: clicked,
			lender: lender,
		};
		conn.db.collection("utm-clicks").insertOne(res);

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		console.error("Error: ", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
