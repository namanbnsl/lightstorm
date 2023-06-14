import { InferModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  name: text("name"),
  email: text("email").primaryKey(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
