import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgres://jimce:jimce@localhost:5432/jimce` // Default for dev db, change if needed
  }
})
