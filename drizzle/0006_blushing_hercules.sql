CREATE TABLE IF NOT EXISTS "users_to_groups" (
	"user_email" text NOT NULL,
	"card_name" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_user_email_card_name" PRIMARY KEY("user_email","card_name");

DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_card_name_cards_name_fk" FOREIGN KEY ("card_name") REFERENCES "cards"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
