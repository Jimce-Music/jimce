CREATE TABLE "songs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
DROP TABLE "test" CASCADE;