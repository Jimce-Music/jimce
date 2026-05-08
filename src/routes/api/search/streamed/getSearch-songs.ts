// ROUTE: /api/search/streamed/search-songs
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
import searchSongs from '../../../../music/meta/searchSongs'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/search/streamed/search-songs',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: '', // TODO: Add summary and description
            description: ``, // Expandable, more detailed description
            // security: requireJWT,

            querystring: z.object({
                q: z.string().min(1)
            }),

            response: {
                200: SuccessIndicatorResponseZ,
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,

                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        // try {
        //     let user: z.infer<typeof JWTPayloadZ>
        //     try {
        //         user = JWTPayloadZ.parse(req.user)
        //     } catch (err) {
        //         logger.warn('Error during JWT payload parsing via zod:')
        //         logger.warn(err)
        //         return res.status(401).send({
        //             statusCode: 401,
        //             error: 'Unauthorized',
        //             message: 'Failed to parse token payload',
        //             code: 'TOKEN_PAYLOAD_INVALID'
        //         })
        //     }
        //     res.status(200).send({ success: true })
        // } catch (err) {
        //     return failInternal(res, err)
        // }

        res.type('application/jsonl')
        res.header('Transfer-Encoding', 'chunked')

        const stream = res.raw

        // Start search and stream chunks
        const searchResults = searchSongs(req.query.q)
        // Wait for search to complete, then return results
        try {
            await new Promise<void>(async (resolve) => {
                const initPacket = searchResults.requestInitPacket()
                const ok = stream.write(`${JSON.stringify(initPacket)}\n`)
                if (!ok) await new Promise((res) => stream.once('drain', res))

                searchResults.onExtenderPacket(async (packet) => {
                    const ok = stream.write(`${JSON.stringify(packet)}\n`)
                    if (!ok)
                        await new Promise((res) => stream.once('drain', res)) // TODO: handle this properly (not waiting right now id say)
                })

                searchResults.onClose(() => {
                    resolve()
                })
            })
            // Close stream now
            stream.end()
        } catch (err) {
            logger.error(err)
            stream.destroy()
            return
        }
    }
)
