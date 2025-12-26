// ################################################ //
// Imports
import logger from './logger'
import fastify from './fastify'
import db, { migrateDB } from './db'

// ################################################ //
// Load config.yml
import config from './config'
import { setupJWT } from './auth/jwt-routes'

// ################################################ //
// Initialization
logger.info('Starting Jimce')

// ################################################ //
// Initialize database
await migrateDB()

// ################################################ //
// Setup auth
await setupJWT()

// ################################################ //
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
