// ################################################ //
// Imports
import logger from './logger'
import fastify from './fastify'

// ################################################ //
// Load config.yml
import config from './config'

// ################################################ //
// Initialization
logger.info('Starting Jimce')

// ################################################ //
// Initialize database

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
