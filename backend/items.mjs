import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export default async (req) => {
  const db = (await clientPromise).db("mysite");
  const notes = db.collection("notes");

  if (req.method === "POST") {
    const { text } = await req.json();
    const result = await notes.insertOne({ text, createdAt: new Date() });
    return Response.json({ _id: result.insertedId, text }, { status: 201 });
  }

  const items = await notes.find().sort({ createdAt: -1 }).toArray();
  return Response.json(items);
};

export const config = { path: "/api/items" };
