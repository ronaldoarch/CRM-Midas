import { connectMongo } from "./mongo";

export async function saveUser(data: any) {
  if (!data.user_id || !data.name || !data.email) {
    console.error('Payload de usuário inválido:', data)
    return
  }
  const db = await connectMongo();
  await db.collection("users").updateOne(
    { user_id: data.user_id },
    { $set: data },
    { upsert: true }
  );
  console.log('Usuário salvo/atualizado:', data)
}

export async function saveDeposit(data: any) {
  if (!data.user_id || !data.amount || !data.deposit_at) {
    console.error('Payload de depósito inválido:', data)
    return
  }
  const db = await connectMongo();
  await db.collection("deposits").insertOne(data);
  console.log('Depósito salvo:', data)
}

export async function saveWithdrawal(data: any) {
  if (!data.user_id || !data.amount || !data.withdrawal_at) {
    console.error('Payload de saque inválido:', data)
    return
  }
  const db = await connectMongo();
  await db.collection("withdrawals").insertOne(data);
  console.log('Saque salvo:', data)
}

export async function saveBet(data: any) {
  if (!data.user_id || !data.bet_id || !data.amount) {
    console.error('Payload de aposta inválido:', data)
    return
  }
  const db = await connectMongo();
  await db.collection("bets").insertOne(data);
  console.log('Aposta salva:', data)
} 