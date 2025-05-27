// lib/mongodb.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ Please define the MONGODB_URI environment variable inside .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
    // In dev, use global to preserve value across module reloads caused by HMR
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri!, options);
        global._mongoClientPromise = client.connect().then((connectedClient) => {
            console.log("✅ Connected to MongoDB");
            return connectedClient;
        }).catch((err) => {
            console.error("❌ MongoDB connection error:", err);
            throw err;
        });
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, don't use global
    client = new MongoClient(uri!, options);
    clientPromise = client.connect().then((connectedClient) => {
        console.log("✅ Connected to MongoDB");
        return connectedClient;
    }).catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    });
}

export default clientPromise;
