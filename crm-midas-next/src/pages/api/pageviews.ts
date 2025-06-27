import { connectMongo } from "@/lib/mongo";

export default async function handler(_req: any, res: any) {
  const db = await connectMongo();

  // Agregar pageviews por data e rota
  const pageviews = await db.collection("pageviews").aggregate([
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" } },
          path: "$path"
        },
        total: { $sum: 1 }
      }
    },
    { $sort: { "_id.date": 1, "_id.path": 1 } }
  ]).toArray();

  res.status(200).json({ pageviews });
} 