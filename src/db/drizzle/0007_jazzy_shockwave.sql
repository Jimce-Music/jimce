ALTER TABLE "artists" ADD COLUMN "deezerId" integer;--> statement-breakpoint
CREATE INDEX "artists_deezer_id_idx" ON "artists" USING btree ("deezerId");