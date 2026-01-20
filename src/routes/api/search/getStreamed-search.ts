// ROUTE: /api/search/streamed-search
// METHOD: GET
// NAME: Streamed-search

import fastify from '../../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../../logger'
import db from '../../../db'
import meta from '../../../meta'
import config from '../../../config'
import BadRequestResponseZ from '../../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../types/UnauthorizedResponseZ'
import type { FastifyReply } from 'fastify'
import _failInternal from '../../../utils/failInternal'
function failInternal(res: FastifyReply, err: unknown) {
    return _failInternal(res, err, import.meta.url)
}
import requireJWT from '../../../types/requireJWT'
import { JWTPayloadZ } from '../../../types/JWTPayload'
import SuccessIndicatorResponseZ from '../../../types/SuccessIndicatorResponseZ'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/search/streamed-search',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: '', // TODO: Add summary and description
            description: ``, // Expandable, more detailed description
            security: requireJWT,

            response: {
                200: SuccessIndicatorResponseZ,
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,

                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        try {
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

            res.status(200).send({ success: true })
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
