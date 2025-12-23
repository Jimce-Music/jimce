// ################################################ //
// Imports
import * as z from 'zod'
import logger from './logger'
import fastify from './fastify'
import ConfigZ from './types/config'

// ################################################ //
// Load config.yml
import config_raw from '../config.yml'
let config: z.infer<typeof ConfigZ>
try {
  config = ConfigZ.parse(config_raw)
} catch (err) {
  logger.error(err)
  logger.fatal('Config is invalid, see the error above')
  process.exit(1)
}

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
