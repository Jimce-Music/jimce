import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
import * as migrator from 'drizzle-orm/bun-sql/migrator'
import config from './config'
import logger from './logger'
import path from 'path'
import { sql } from 'drizzle-orm'

export const client = new SQL(
    `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.db}`
)

const db = drizzle({ client })

/**
 * This function will apply necessary database migrations during runtime
 */
export async function migrate() {
    logger.info('Starting database migrations')

    try {
        // UUID extension
        await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

        // DB migrations
        await migrator.migrate(db, {
            migrationsFolder: path.join(__dirname, 'db', 'drizzle')
        })
    } catch (err) {
        logger.error(err)
        logger.fatal('Database migrations failed. See the error above.')
        process.exit(1)
    }

    logger.info('Database migrations were successful')
}

export default db
