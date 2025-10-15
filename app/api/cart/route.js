import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { NextResponse } from "next/server";
dotenv.config();

export async function POST(request) {
    const url = process.env.MONGO_URL;
    if (!url) {
        return NextResponse.json({ error: "Mongo_URL is not defind" })
    }
    const client = new MongoClient(url);

    try {
        const database = client.db('amazon_db');
        const deals = database.collection('offer_product');
        const deal = await deals.findOne({});
        return NextResponse.json({ success: true, deal })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ error: "Failed to connect to the database", details: error.message });
    } finally {
        await client.close();
    }
}