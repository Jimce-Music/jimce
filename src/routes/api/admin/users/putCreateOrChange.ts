// ROUTE: /api/admin/users/create-or-change
// METHOD: PUT
// NAME: Create

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
import SuccessIndicatorResponseZ from '../../../../types/SuccessIndicatorResponseZ'
import { usersTable } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import requireJWT from '../../../../types/requireJWT'
import { JWTPayloadZ } from '../../../../types/JWTPayload'
import ForbiddenResponseZ from '../../../../types/ForbiddenResponseZ'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().put(
    '/api/admin/users/create-or-change',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Creates or changes a new user',
            description: `Based on provided username, password, email and isAdmin bool, this route will create or update a new user.
                When the user with the provided username already exists, the user will be updated instead of re-created.
            
                **Requires authentication**
                **Requires admin privileges** 
            `, // Expandable, more detailed description

            security: requireJWT,

            body: z.object({
                username: z
                    .string()
                    .min(3)
                    .meta({
                        description:
                            'The username which will be assigned to the user (if already in use, user will be updated)',
                        examples: ['test.user']
                    }),
                password: z.string().min(12).optional().meta({
                    description:
                        'The new password in plain text for the user. Optional when user already exists, necessary when creating from scratch. Must be at least 12 characters long'
                }),
                email: z
                    .email()
                    .or(z.null())
                    .meta({
                        description:
                            'If provided, the new email of the user, if set to null, it will still be updated to null.',
                        examples: ['user@example.com']
                    }),
                isAdmin: z.boolean().meta({
                    description:
                        'Declares whether the user shall have admin rights',
                    examples: [false, true]
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
        // Get JWT payload / user-info
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

        let reason: string = ''

        // Check if user already exists
        try {
            const matchingUsers = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, req.body.username))
            const userExistent = matchingUsers.length > 0

            // Update / Create
            if (!userExistent) {
                // Create user from scratch
                // Check if password is supplied
                if (typeof req.body.password !== 'string') {
                    logger.warn(
                        'An admin tried to create an user without supplying a password'
                    )

                    res.status(400)
                    res.send({
                        statusCode: 400,
                        code: 'ERR_NO_PASSWORD_SPECIFIED',
                        error: 'Bad Request',
                        message:
                            'The user with the provided username does not exist. As no password was specified, it cannot be created'
                    })
                    return
                }
                // Password is now for sure a string and at least 12 chars long
                const pw: string = req.body.password

                // Actually create user in database
                await db.insert(usersTable).values({
                    username: req.body.username,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    pwHash: await Bun.password.hash(pw, {
                        algorithm: 'argon2id',
                        memoryCost: 4,
                        timeCost: 8
                    })
                })

                reason = 'Created'
            } else {
                // Update user
                const userData: {
                    email: string | null
                    isAdmin: boolean
                    pwHash?: string
                } = {
                    email: req.body.email,
                    isAdmin: req.body.isAdmin
                }

                if (typeof req.body.password === 'string') {
                    userData.pwHash = await Bun.password.hash(
                        req.body.password,
                        {
                            algorithm: 'argon2id',
                            memoryCost: 4,
                            timeCost: 8
                        }
                    )
                }

                await db
                    .update(usersTable)
                    .set(userData)
                    .where(eq(usersTable.username, req.body.username))

                reason = 'Updated'
            }

            // Reply to the client
            res.status(200)
            await res.send({
                success: true,
                reason
            })
        } catch (err) {
            logger.error('Error on route api/admin/users/putCreateOrChange')
            logger.error(err)
            res.status(500)
            res.send({
                statusCode: 500,
                code: 'ERR_INTERNAL',
                error: 'Internal Server Error',
                message:
                    'Something went wrong, probably with the database. Make sure to contact the server admin, who will check the logs for further information.'
            })
        }
    }
)
