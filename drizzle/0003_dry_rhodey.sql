CREATE TABLE IF NOT EXISTS "finance_transactions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(255) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "finance_user" ADD COLUMN "balance" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_user_id_finance_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."finance_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
