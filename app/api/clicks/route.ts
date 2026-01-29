import { type NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "../../../lib/db";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
    try {
        const { phone, clicked, lender } = await req.json();
        await connectToMongoDB();
        // const conn = await connectToMongoDB();
        // if (!conn?.db) throw new Error("Failed to connect to MongoDB");

        const res = { phone: phone, date: new Date(), clicked: clicked, lender: lender };
        mongoose.connection.collection("utm-clicks").insertOne(res);

        return NextResponse.json(res, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
