import { InferModel } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  name: text("name"),
  email: text("email").primaryKey(),
  image: text("image"),
  customer_id: text("customer_id"),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;

export const cards = pgTable("cards", {
  name: text("name").primaryKey(),
  description: text("description"),
  price: integer("price"),
});

export type Card = InferModel<typeof cards>;
export type NewCard = InferModel<typeof cards, "insert">;
