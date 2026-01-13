// ROUTE: /api/auth/check-token
// METHOD: GET
// NAME: Check-token

import fastify from '../../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../../logger'
import BadRequestResponseZ from '../../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../types/UnauthorizedResponseZ'
import requireJWT from '../../../types/requireJWT'
import { encodeJWTPayload, JWTPayloadZ } from '../../../types/JWTPayload'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/auth/check-token',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Checks if token is still valid',
            description:
                'Checks if a token is still valid and returns the associated user, expiration date, user permissions, etc.',

            security: requireJWT,

            response: {
                200: z.object({
                    payload: JWTPayloadZ,
                    isAdmin: z.boolean()
                }),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        let user: z.infer<typeof JWTPayloadZ>
        try {
            user = JWTPayloadZ.parse(req.user)
        } catch (err) {
            logger.warn('Error during JWT payload parsing via zod:')
            logger.warn(err)
            return res.status(401).send({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Failed to parse token payload',
                code: 'TOKEN_PAYLOAD_INVALID'
            })
        }

        return res.status(200).send({
            payload: encodeJWTPayload(user),
            isAdmin: req.isAdmin
        })
    }
)
