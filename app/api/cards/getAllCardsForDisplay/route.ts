import { cards } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET() {
  const connectionString = process.env.DATABASE_URL as string;
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  const cards_data = await db.select().from(cards);

  return NextResponse.json({ cards: cards_data ?? [] });
}
