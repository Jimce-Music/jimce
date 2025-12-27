import fastify from '../fastify'
import logger from '../logger'
import jwtPlugin from './jwtPlugin'

/**
 * This function will initialize all necessary handlers and routes regarding JWT
 */
export async function setupJWT() {
    // Setup
    // Lets load the custom jwt plugin
    await fastify.register(jwtPlugin)

    logger.info('Successfully initialized JWT auth plugin')
}
