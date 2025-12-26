import fastify from '../fastify'
import jwtPlugin from './jwtPlugin'

/**
 * This function will initialize all necessary handlers and routes regarding JWT
 */
export async function setupJWT() {
    // Setup
    // Token generation route
    fastify.post('/generate-token', (req, res) => {
        const token = fastify.jwt.sign({
            // Payload here
            // For now 'test', but shall contain username
            username: 'test.user'
            // TODO: Make JWT generation better (only for authorized users --> pw check) and store username
        })

        res.send({ token })
    })

    // Lets load the custom jwt plugin
    await fastify.register(jwtPlugin)

    // And define a test route
    // TODO: Remove later
    fastify.get(
        '/test-jwt',
        {
            onRequest: [fastify.authenticate]
        },
        async function (request, reply) {
            return request.user
        }
    )
}
