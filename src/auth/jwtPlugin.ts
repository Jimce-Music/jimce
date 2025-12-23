import fastifyJwt from '@fastify/jwt'
import fp from 'fastify-plugin'
import config from '../config'

export default fp(async (fastify) => {
    fastify.register(fastifyJwt, {
        secret: config.auth.jwt_secret
    })

    fastify.decorate('authenticate', async (req, res) => {
        try {
            await req.jwtVerify()
        } catch (err) {
            res.send(err)
        }
    })
})
