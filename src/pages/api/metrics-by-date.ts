import { connectMongo } from "@/lib/mongo";

export default async function handler(_: any, res: any) {
  const db = await connectMongo();
  const now = new Date();
  const start = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);

  // Depósitos por dia
  const deposits = await db.collection("deposits").aggregate([
    { $match: { deposit_at: { $gte: start.toISOString() } } },
    { $addFields: { date: { $substr: ["$deposit_at", 0, 10] } } },
    { $group: { _id: "$date", total: { $sum: 1 }, sum: { $sum: "$amount" } } },
    { $sort: { _id: 1 } }
  ]).toArray();

  // Saques por dia
  const withdrawals = await db.collection("withdrawals").aggregate([
    { $match: { withdrawal_at: { $gte: start.toISOString() } } },
    { $addFields: { date: { $substr: ["$withdrawal_at", 0, 10] } } },
    { $group: { _id: "$date", total: { $sum: 1 }, sum: { $sum: "$amount" } } },
    { $sort: { _id: 1 } }
  ]).toArray();

  // Apostas por dia
  const bets = await db.collection("bets").aggregate([
    { $match: { placed_at: { $gte: start.toISOString() } } },
    { $addFields: { date: { $substr: ["$placed_at", 0, 10] } } },
    { $group: { _id: "$date", total: { $sum: 1 }, sum: { $sum: "$amount" } } },
    { $sort: { _id: 1 } }
  ]).toArray();

  res.status(200).json({ deposits, withdrawals, bets });
} 