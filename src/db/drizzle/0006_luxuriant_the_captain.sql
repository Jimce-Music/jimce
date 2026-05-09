DROP INDEX "artists_name_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "artists_name_idx" ON "artists" USING btree ("name");--> statement-breakpoint
ALTER TABLE "artists" ADD CONSTRAINT "artists_name_unique" UNIQUE("name");