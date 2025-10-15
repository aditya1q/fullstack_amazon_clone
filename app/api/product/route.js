import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

export async function GET(request) {
    const url = process.env.MONGO_URL;
    if (!url) {
        return NextResponse.json({ error: "MONGO_URL is not defined in .env file" });
    }

    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('amazon_db');
        const products = database.collection('product');
        const product = await products.findOne({});
        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({
            error: "Failed to connect to the database",
            details: error.message,
        });
    } finally {
        await client.close();
    }
}
