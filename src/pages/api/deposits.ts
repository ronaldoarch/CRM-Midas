import { connectMongo } from "@/lib/mongo";

export default async function handler(req: any, res: any) {
  const db = await connectMongo();
  const deposits = await db.collection("deposits").find({}).toArray();
  res.status(200).json(deposits);
} 