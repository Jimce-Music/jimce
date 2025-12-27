// This file will "tell" typescript about our jwt plugin for fastify

import 'fastify'
import type { JWTPayloadT } from './JWTPayload'

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>
    }

    // Add isAdmin property to request
    interface FastifyRequest {
        isAdmin: boolean
    }
}
