import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
import config from './config'

export const client = new SQL(
  `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`
)

const db = drizzle({ client })

// TODO: Add init function to auto apply migrations

export default db
