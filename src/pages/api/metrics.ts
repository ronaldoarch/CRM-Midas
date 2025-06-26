import { connectMongo } from "@/lib/mongo";

export default async function handler(_: any, res: any) {
  const db = await connectMongo();

  // Total de usuários
  const totalUsers = await db.collection("users").countDocuments();

  // Total de depósitos e soma dos depósitos
  const depositsAgg = await db.collection("deposits").aggregate([
    { $group: { _id: null, total: { $sum: 1 }, sum: { $sum: "$amount" } } }
  ]).toArray();
  const totalDeposits = depositsAgg[0]?.total || 0;
  const sumDeposits = depositsAgg[0]?.sum || 0;

  // Total de saques e soma dos saques
  const withdrawalsAgg = await db.collection("withdrawals").aggregate([
    { $group: { _id: null, total: { $sum: 1 }, sum: { $sum: "$amount" } } }
  ]).toArray();
  const totalWithdrawals = withdrawalsAgg[0]?.total || 0;
  const sumWithdrawals = withdrawalsAgg[0]?.sum || 0;

  // Total de apostas e soma dos valores apostados
  const betsAgg = await db.collection("bets").aggregate([
    { $group: { _id: null, total: { $sum: 1 }, sum: { $sum: "$amount" } } }
  ]).toArray();
  const totalBets = betsAgg[0]?.total || 0;
  const sumBets = betsAgg[0]?.sum || 0;

  res.status(200).json({
    totalUsers,
    totalDeposits,
    sumDeposits,
    totalWithdrawals,
    sumWithdrawals,
    totalBets,
    sumBets
  });
} 