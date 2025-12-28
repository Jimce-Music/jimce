// ROUTE: /api/auth/change-password
// METHOD: PUT
// NAME: Change-password

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
import * as Bun from 'bun'
import { usersTable } from '../../../db/schema'
import { eq } from 'drizzle-orm'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().put(
    '/api/auth/change-password',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Changes the password',
            description: `Changes the password for the currently logged in user`, // Expandable, more detailed description
            security: requireJWT,
            body: z.object({
                newPassword: z
                    .string()
                    .min(12)
                    .meta({
                        description:
                            'The new password as plain text for the user',
                        examples: ['123456789abc']
                    })
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
        try {
            const user = JWTPayloadZ.parse(req.user)

            // Change password
            const pwHash = await Bun.password.hash(req.body.newPassword, {
                algorithm: 'argon2id',
                memoryCost: 4,
                timeCost: 8
            })

            const updatedUsers = await db
                .update(usersTable)
                .set({
                    pwHash
                })
                .where(eq(usersTable.id, user.id))
                .returning()

            if (updatedUsers.length === 1) {
                return res
                    .status(200)
                    .send({ success: true, reason: 'Password was changed' })
            } else if (updatedUsers.length > 1) {
                logger.warn('Password was changed for multiple users:')
                logger.warn(updatedUsers, 'updated users:')
                return res.status(200).send({
                    success: true,
                    reason: 'Password was changed'
                })
            } else {
                return res.status(200).send({
                    success: false,
                    reason: 'No user with your userid was found in the database'
                })
            }
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
