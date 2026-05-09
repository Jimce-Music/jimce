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
import type { SRLExtenderPacket, SRLInitPacket } from 'streamed-result-list'
import type { JimceSongSearchResult } from '../../../../music/meta/JimceSearchResult'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/search/streamed/search-songs',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Search for songs (STREAMED)', // TODO: Add summary and description
            description: `This allows to search for songs by a specified query and returns multiple, streamed lines of json.
This route is not supported by the normal OpenAPI clients but should be used in combination with fetch and the official https://github.com/Jimce-Music/streamed-result-list package, which allows parsing the streamed result back into a list.
This also simplifies usage with react (states).`, // Expandable, more detailed description
            security: requireJWT,

            querystring: z.object({
                q: z.string().min(1)
            }),

            response: {
                200: z.any(),
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
        } catch (err) {
            return failInternal(res, err)
        }

        res.type('application/jsonl')
        res.header('Transfer-Encoding', 'chunked')

        const stream = res.raw

        // Start search and stream chunks
        const searchResults = searchSongs(req.query.q)
        // Wait for search to complete, then return results
        try {
            await new Promise<void>(async (resolve) => {
                let writeChain = Promise.resolve() // start with a resolved promise

                function writePacket(
                    packet:
                        | SRLInitPacket<JimceSongSearchResult>
                        | SRLExtenderPacket<JimceSongSearchResult>
                ) {
                    // Append this packet to the chain
                    writeChain = writeChain.then(() => {
                        if (
                            stream.closed ||
                            stream.writableEnded ||
                            stream.destroyed
                        ) {
                            logger.warn(
                                'streamed search: stream already closed; will not write data'
                            )
                            stream.destroy()
                            resolve()
                            return
                        }
                        const ok = stream.write(`${JSON.stringify(packet)}\n`)
                        if (ok) return // immediate success
                        return new Promise((res) => stream.once('drain', res)) // wait for queue / drain
                    })
                }

                const initPacket = searchResults.requestInitPacket()
                writePacket(initPacket)

                stream.on('close', () => {
                    stream.destroy()
                    resolve()
                    return
                })

                searchResults.onExtenderPacket((packet) => {
                    writePacket(packet)
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
