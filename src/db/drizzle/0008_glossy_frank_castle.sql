ALTER TABLE "songs" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "ytid" varchar(16);--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "coverImage" uuid;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "coverImagePreview" uuid;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_coverImage_assets_id_fk" FOREIGN KEY ("coverImage") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "songs" ADD CONSTRAINT "songs_coverImagePreview_assets_id_fk" FOREIGN KEY ("coverImagePreview") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "songs_ytid_idx" ON "songs" USING btree ("ytid");--> statement-breakpoint
CREATE INDEX "songs_mbid_idx" ON "songs" USING btree ("mbid");--> statement-breakpoint
CREATE INDEX "songs_name_idx" ON "songs" USING btree ("name");