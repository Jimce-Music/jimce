// ROUTE: /api/admin/users/user
// METHOD: DELETE
// NAME: User

import fastify from '../../../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../../../logger'
import db from '../../../../db'
import meta from '../../../../meta'
import type { FastifyReply } from 'fastify'
import _failInternal from '../../../../utils/failInternal'
function failInternal(res: FastifyReply, err: unknown) {
    return _failInternal(res, err, import.meta.url)
}
import requireJWT from '../../../../types/requireJWT'
import { JWTPayloadZ } from '../../../../types/JWTPayload'
import SuccessIndicatorResponseZ from '../../../../types/SuccessIndicatorResponseZ'
import ForbiddenResponseZ from '../../../../types/ForbiddenResponseZ'
import { usersTable } from '../../../../db/schema'
import { eq } from 'drizzle-orm'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().delete(
    '/api/admin/users/user',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: '', // TODO: Add summary and description
            description: ``, // Expandable, more detailed description
            security: requireJWT,
            body: z.object({
                id: z.string().min(4).meta({
                    description: 'The uuid of the user to delete'
                })
            }),

            response: {
                200: SuccessIndicatorResponseZ,
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
                logger.error('Error during JWT payload parsing via zod:')
                logger.error(err)
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

            // Delete users
            const deletedUsers = await db
                .delete(usersTable)
                .where(eq(usersTable.id, req.body.id))
                .returning()
            if (deletedUsers.length > 0) {
                // Success
                logger.info(
                    `An admin successfully deleted ${deletedUsers.length} user(s): ${deletedUsers.map((u) => u.username).join(', ')}`
                )
                return res.status(200).send({
                    success: true,
                    reason: `Deleted ${deletedUsers.length} user(s)`
                })
            } else {
                logger.warn(
                    `An admin tried to delete user ${req.body.id}, but no match was found in the database`
                )
                return res.status(200).send({
                    success: false,
                    reason: 'No matching user was found'
                })
            }
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
