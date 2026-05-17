ALTER TABLE "artists" ADD COLUMN "spotifyId" varchar(255);--> statement-breakpoint
CREATE INDEX "artists_spotify_id_idx" ON "artists" USING btree ("spotifyId");--> statement-breakpoint
CREATE INDEX "artists_mbid_idx" ON "artists" USING btree ("mbid");