// This file will "tell" typescript about our jwt plugin for fastify

import 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>
    }
}
