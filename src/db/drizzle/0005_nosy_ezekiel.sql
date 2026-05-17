CREATE TABLE "artists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"profilePicture" uuid,
	"backgroundPicture" uuid,
	"mbid" char(36)
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"fileExtension" varchar(10) NOT NULL,
	"assetPath" char(64) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "downloaded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "downloadDate" date;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "firstRecognizedDate" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "lastPlayedByAnyoneDate" date;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "soundDefault" uuid;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "artistIds" uuid[];--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "mbid" char(36);--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_profilePicture_assets_id_fk" FOREIGN KEY ("profilePicture") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_backgroundPicture_assets_id_fk" FOREIGN KEY ("backgroundPicture") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "artists_name_idx" ON "artists" USING btree ("name");--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_soundDefault_assets_id_fk" FOREIGN KEY ("soundDefault") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;