// ROUTE: /api/asset/:assetuuid
// METHOD: GET
// NAME: [assetuuid]

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
import { Asset } from '../../../utils/assets'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/asset/:assetuuid/:prettyname?',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary:
                'Sends back the specified asset (also streamable via HTTP range requests)',
            description: `Can be used directly in the browser with fetch, blob and object url. Recommended to cache via service workers and media cache api.`, // Expandable, more detailed description
            security: requireJWT,

            response: {
                200: z.any(),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                404: z.object({
                    msg: z.string()
                }),

                500: InternalServerErrorResponseZ
            },

            params: z.object({
                assetuuid: z.string(),
                prettyname: z.string().optional()
            })
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

            const assetId = req.params.assetuuid.replace(/[^-\w]/g, '') // sanitize input
            // prettyname will be ignored

            const asset = new Asset(assetId)

            if (!(await asset.existsInFs())) {
                return res.status(404).send({
                    msg: "The asset was not found in the server's file system"
                })
            }

            await asset.fetch()

            res.header('cache-control', 'private, max-age=604800')
            res.header('etag', `${req.params.assetuuid}`)

            res.header(
                'content-type',
                asset.mimeType ?? 'application/octet-stream'
            )

            return res.sendFile(await asset.getPath())
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
