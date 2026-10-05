import { getDatabase } from "@netlify/database";

export default async (req) => {
  const db = getDatabase();

  if (req.method === "POST") {
    const { text } = await req.json();
    const rows = await db.sql`
      INSERT INTO notes (text) VALUES (${text}) RETURNING id, text
    `;
    return Response.json(rows[0], { status: 201 });
  }

  const rows = await db.sql`
    SELECT id, text FROM notes ORDER BY created_at DESC
  `;
  return Response.json(rows);
};

export const config = { path: "/api/items" };
