import { connectMongo } from "@/lib/mongo";

export default async function handler(_req: any, res: any) {
  if (_req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const db = await connectMongo();

  const { path, userId } = _req.body;

  if (!path) {
    return res.status(400).json({ error: "Path é obrigatório" });
  }

  await db.collection("pageviews").insertOne({
    path,
    userId: userId || null,
    viewedAt: new Date()
  });

  res.status(200).json({ ok: true });
} 