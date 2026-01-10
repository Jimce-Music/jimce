// ROUTE: /api/auth/login-basic
// METHOD: POST
// NAME: Login-basic

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
import {
    encodeJWTPayload,
    type JWTPayloadT
} from '../../../types/JWTPayload'

import type { FastifyReply } from 'fastify'
import _failInternal from '../../../utils/failInternal'
import { usersTable } from '../../../db/schema'
import { eq } from 'drizzle-orm'
function failInternal(res: FastifyReply, err: unknown) {
    return _failInternal(res, err, import.meta.url)
}

export const $DefaultResponse = z.object({
    token: z.string().meta({
        description: 'The Json Web Token (JWT) issued by the server',
        examples: [
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
        ]
    })
})

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().post(
    '/api/auth/login-basic',
    {
        schema: {
            hide: false,
            summary: 'Login via basic auth',
            description: `Ask server to issue a JWT based on user & password credentials`, // Expandable, more detailed description

            body: z.object({
                username: z.string().min(3),
                password: z.string().min(12)
            }),

            response: {
                200: $DefaultResponse,
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        // TODO: Fail automatically if basic auth is disabled
        try {
            // Check if login data is correct
            // Check if user with same username exists
            const matchingUsers = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, req.body.username))
            if (matchingUsers.length <= 0) {
                return res.status(401).send({
                    statusCode: 401,
                    code: 'WRONG_CREDENTIALS',
                    error: 'Unauthorized',
                    message: 'Either the username or the password is incorrect.'
                })
            }
            const matchingUser = matchingUsers[0]
            if (typeof matchingUser === 'undefined')
                return res.status(401).send({
                    statusCode: 401,
                    code: 'WRONG_CREDENTIALS',
                    error: 'Unauthorized',
                    message: 'Either the username or the password is incorrect.'
                })
            // Compare password hash
            if (matchingUser.pwHash === null) {
                logger.warn(
                    `User ${req.body.username} tried to login with basic auth, but there was no pwHash found in the database`
                )
                return res.status(401).send({
                    statusCode: 401,
                    code: 'WRONG_CREDENTIALS',
                    error: 'Unauthorized',
                    message: 'Either the username or the password is incorrect.'
                })
            }
            const isValidPW = await Bun.password.verify(
                req.body.password,
                matchingUser.pwHash
            )
            if (!isValidPW) {
                logger.info(
                    `Login with invalid password rejected: ${req.body.username}`
                )
                return res.status(401).send({
                    statusCode: 401,
                    code: 'WRONG_CREDENTIALS',
                    error: 'Unauthorized',
                    message: 'Either the username or the password is incorrect.'
                })
            }

            // Sign and send token
            const tokenPayload: JWTPayloadT = {
                id: matchingUser.id,
                username: matchingUser.username,
                validUntil: new Date(
                    Date.now() +
                        2 * /*hours*/ 60 /*mins*/ * 60 /*secs*/ * 1_000 /*ms*/ // TODO: Adjust token valid time
                )
            }

            const token = fastify.jwt.sign(encodeJWTPayload(tokenPayload))

            res.status(200).send({ token })
        } catch (err) {
            return failInternal(res, err)
        }
    }
)
