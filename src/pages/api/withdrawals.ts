import { connectMongo } from "@/lib/mongo";

export default async function handler(_: any, res: any) {
  const db = await connectMongo();
  const withdrawals = await db.collection("withdrawals").find({}).toArray();
  res.status(200).json(withdrawals);
} 