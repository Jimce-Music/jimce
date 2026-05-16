// ROUTE: /api/dummy/schemas/search-schema
// METHOD: GET
// NAME: Search-schema

import fastify from '../../../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../../../logger'
import db from '../../../../db'
import meta from '../../../../meta'
import config from '../../../../config'
import BadRequestResponseZ from '../../../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../../types/UnauthorizedResponseZ'
import type { FastifyReply } from 'fastify'
import _failInternal from '../../../../utils/failInternal'
function failInternal(res: FastifyReply, err: unknown) {
    return _failInternal(res, err, import.meta.url)
}
import requireJWT from '../../../../types/requireJWT'
import { JWTPayloadZ } from '../../../../types/JWTPayload'
import SuccessIndicatorResponseZ from '../../../../types/SuccessIndicatorResponseZ'
import ForbiddenResponseZ from '../../../../types/ForbiddenResponseZ'
import { JimceSongSearchResultZ } from '../../../../music/meta/JimceSearchResult'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/dummy/schemas/search-schema',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Dummy route for search schema',
            description: `This route is just a dummy to export the JimceSongSearchResult type via the api client package`, // Expandable, more detailed description
            security: requireJWT,

            response: {
                200: JimceSongSearchResultZ,
                204: z.null(),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                403: ForbiddenResponseZ,
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

            if (!req.isAdmin) {
                return res.status(403).send({
                    statusCode: 403,
                    code: 'NOT_AN_ADMIN',
                    error: 'Forbidden',
                    message: 'You need admin rights to access this route'
                })
            }

            res.status(204).send(null)
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
