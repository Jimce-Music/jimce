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
