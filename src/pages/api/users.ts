import { connectMongo } from "@/lib/mongo";

export default async function handler(req: any, res: any) {
  const db = await connectMongo();
  const users = await db.collection("users").find({}).toArray();
  res.status(200).json(users);
} 