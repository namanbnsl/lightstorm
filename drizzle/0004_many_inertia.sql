ALTER TABLE "users" ADD COLUMN "customer_id" integer;
ALTER TABLE "users" DROP COLUMN IF EXISTS "created_at";
ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_at";