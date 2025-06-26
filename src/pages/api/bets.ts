import { connectMongo } from "@/lib/mongo";

export default async function handler(_: any, res: any) {
  const db = await connectMongo();
  const bets = await db.collection("bets").find({}).toArray();
  res.status(200).json(bets);
} 