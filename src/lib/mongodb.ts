import { MongoClient } from "mongodb";

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not set");
	}
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = new MongoClient(uri).connect();
	}
	return global._mongoClientPromise;
}

export async function connectToDatabase(dbName = "gvas_womens_soccer") {
	const client = await getClientPromise();
	const db = client.db(dbName);
	return { db, client };
}
