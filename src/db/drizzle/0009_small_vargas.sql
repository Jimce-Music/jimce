ALTER TABLE "assets" ADD COLUMN "mimeType" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "assets" ADD COLUMN "creationDate" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "assets" DROP COLUMN "assetPath";