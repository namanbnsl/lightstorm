CREATE TABLE IF NOT EXISTS "cards" (
	"name" text PRIMARY KEY NOT NULL,
	"description" text,
	"price" integer
);

CREATE TABLE IF NOT EXISTS "users" (
	"name" text,
	"email" text PRIMARY KEY NOT NULL,
	"image" text,
	"customer_id" text
);
