// ROUTE: /api/ping
// METHOD: GET
// NAME: Ping

import fastify from '../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../logger'
import db from '../../db'
import meta from '../../meta'
import config from '../../config'
import BadRequestResponseZ from '../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../types/UnauthorizedResponseZ'
import type { FastifyReply, FastifyRequest } from 'fastify'
import _failInternal from '../../utils/failInternal'
function failInternal(res: FastifyReply, err: unknown) {
    return _failInternal(res, err, import.meta.url)
}
import requireJWT from '../../types/requireJWT'
import { JWTPayloadZ } from '../../types/JWTPayload'
import SuccessIndicatorResponseZ from '../../types/SuccessIndicatorResponseZ'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/ping',
    {
        schema: {
            hide: false,
            summary: 'Pings the server',
            description: `Can be used to determine whether the server is up and running without need for authentication.`, // Expandable, more detailed description

            response: {
                200: {
                    description: 'pong',
                    content: {
                        'text/plain': {
                            schema: z.literal('pong')
                        }
                    }
                },
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,

                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req: FastifyRequest, res: FastifyReply) => {
        try {
            res.status(200).send('pong')
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
