// ROUTE: /api/search/simple/search-songs
// METHOD: GET
// NAME: Search-songs

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
import { JimceSongSearchResultZ } from '../../../../music/meta/JimceSearchResult'
import searchSongs from '../../../../music/meta/searchSongs'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/search/simple/search-songs',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Search for songs (NOT STREAMED)',
            description: `This allows to search for songs by a specified query and returns the results once all are available. This is more of a fallback route as streamed search is preferred.`, // Expandable, more detailed description
            security: requireJWT,

            querystring: z.object({
                q: z.string().min(1)
            }),

            response: {
                200: JimceSongSearchResultZ.partial().array(),
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

            // Start search
            const searchResults = searchSongs(req.query.q)
            // Wait for search to complete, then return results
            await new Promise<void>((resolve) => {
                searchResults.onClose(() => {
                    resolve()
                })
            })
            // logger.info(searchResults.asArray())
            return res.status(200).send([...searchResults.asArray()])
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
