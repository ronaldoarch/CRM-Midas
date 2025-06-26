import { connectMongo } from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { path, userId } = req.body;

  if (!path) {
    return res.status(400).json({ error: "Path é obrigatório" });
  }

  const db = await connectMongo();
  await db.collection("pageviews").insertOne({
    path,
    userId: userId || null,
    viewedAt: new Date()
  });

  res.status(200).json({ ok: true });
} 