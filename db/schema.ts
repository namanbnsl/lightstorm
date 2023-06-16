import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

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

export const usersRelations = relations(users, ({ many }) => ({
  usersToCards: many(usersToCards),
}));

export const cardsRelation = relations(cards, ({ many }) => ({
  usersToCards: many(usersToCards),
}));

export const usersToCards = pgTable(
  "users_to_cards",
  {
    userEmail: text("user_email")
      .notNull()
      .references(() => users.email),
    cardName: integer("card_name")
      .notNull()
      .references(() => cards.name),
  },
  (t) => ({
    pk: primaryKey(t.userEmail, t.cardName),
  })
);

export const usersToCardsRelations = relations(usersToCards, ({ one }) => ({
  card: one(cards, {
    fields: [usersToCards.cardName],
    references: [cards.name],
  }),
  user: one(users, {
    fields: [usersToCards.userEmail],
    references: [users.email],
  }),
}));

export type Card = InferModel<typeof cards>;
export type NewCard = InferModel<typeof cards, "insert">;
