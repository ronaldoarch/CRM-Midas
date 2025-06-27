import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function connectMongo() {
  await client.connect();
  return client.db();
} 