// ROUTE: /api/me/userinfo
// METHOD: GET
// NAME: Userinfo

import fastify from '../../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../../logger'
import db from '../../../db'
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
import { usersTable } from '../../../db/schema'
import { eq } from 'drizzle-orm'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/me/userinfo',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Returns info about the current user', // TODO: Add summary and description
            description: `This route can be used to retrieve detailed information about the user associated with current JWT, like username, id, etc.`, // Expandable, more detailed description
            security: requireJWT,

            response: {
                200: z
                    .object({
                        id: z.string().meta({
                            description: 'The uuid of the user'
                        }),
                        username: z.string(),
                        email: z.string().or(z.null()),
                        isAdmin: z.boolean()
                    })
                    .meta({ description: 'The user info' }),
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
                logger.error('Error during JWT payload parsing via zod:')
                logger.error(err)
                return res.status(401).send({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Failed to parse token payload',
                    code: 'TOKEN_PAYLOAD_INVALID'
                })
            }

            // Query data
            const matchingUsers = await db
                .select({
                    id: usersTable.id,
                    username: usersTable.username,
                    email: usersTable.email,
                    isAdmin: usersTable.isAdmin
                })
                .from(usersTable)
                .where(eq(usersTable.id, user.id))

            if (matchingUsers.length <= 0) {
                failInternal(res, 'No matching user found')
            } else {
                // Send data
                return res.status(200).send(matchingUsers[0])
            }
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
