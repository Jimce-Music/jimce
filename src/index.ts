// ################################################ //
// Imports
import logger from './logger'
import fastify from './fastify'
import db, { migrateDB } from './db'
import fs from 'fs'
import path from 'path'
import { setupJWT } from './auth/jwt-routes'

// ################################################ //
// Load config.yml
import config from './config'
// Load meta.yml
import meta from './meta'
import { usersTable } from './db/schema'
import { eq } from 'drizzle-orm'
import chalk from 'chalk'

// ################################################ //
// Initialization
logger.info('Starting Jimce')

// ################################################ //
// Initialize database
if (meta.execution.disable_db) {
    logger.info('Detected CI run, skipping database migrations')
} else {
    await migrateDB()
}

// ################################################ //
// Create admin users if none exist
if (!meta.execution.disable_background_jobs && !meta.execution.disable_db) {
    const adminUsers = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.isAdmin, true))
    if (adminUsers.length > 0) {
        logger.info(
            `${adminUsers.length} admins were found, no new ones created`
        )
    } else {
        await db.insert(usersTable).values({
            username: 'admin',
            email: null,
            isAdmin: true,
            pwHash: await Bun.password.hash('123456789abc', {
                algorithm: 'argon2id',
                memoryCost: 4,
                timeCost: 8
            })
        })
        logger.info(
            `As no admin users were found, a new user called ${chalk.yellow('"admin"')} with the password ${chalk.yellow('"123456789abc"')} was created.`
        )
        logger.warn(
            'For security reasons, make sure to change the password of the automatically created user.'
        )
    }
} else {
    logger.info(
        "Won't check if admin users exist because background jobs or database is disabled"
    )
}

// ################################################ //
// Setup auth
await setupJWT()

// ################################################ //
// Register routes
await import('./routes/all') // Dynamic import in order to first wait for JWT plugin to register
logger.info('Registered all routes')

// Prepare launch
await fastify.ready()

// Write openapi.json
const openapi = fastify.swagger()
fs.writeFileSync(
    path.join(__dirname, '..', 'openapi.json'),
    JSON.stringify(openapi, null, 2)
)
logger.info('Done writing openapi.json')

// Start webserver
try {
    await fastify.listen({ port: config.server.port })
} catch (err) {
    fastify.log.error(err)
    logger.fatal(
        'Webserver was not able to start. See the jimce-server.log file for more information'
    )
    process.exit(1)
} finally {
    logger.info(`Webserver listening on port ${config.server.port}`)
}
