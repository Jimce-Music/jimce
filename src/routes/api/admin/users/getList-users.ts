// ROUTE: /api/admin/users/list-users
// METHOD: GET
// NAME: List-users

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
import { usersTable } from '../../../../db/schema'
import BadRequestResponseZ from '../../../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../../types/UnauthorizedResponseZ'
import requireJWT from '../../../../types/requireJWT'
import { JWTPayloadZ } from '../../../../types/JWTPayload'
import ForbiddenResponseZ from '../../../../types/ForbiddenResponseZ'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/admin/users/list-users',
    {
        onRequest: [fastify.authenticate], // Secures route with JWT

        schema: {
            hide: false,
            summary: 'Lists all users',
            description: `Returns id, username, email and isAdmin for every registered user
                
                **Requires authentication**
                **Requires admin privileges** 
                `, // Expandable, more detailed description

            security: requireJWT,

            response: {
                200: z
                    .object({
                        id: z.string().meta({
                            description: 'The uuid of the user',
                            examples: ['5b9e340c-38ba-4495-b895-c3aee230134e']
                        }),
                        username: z.string(),
                        email: z
                            .string()
                            .or(z.null())
                            .meta({
                                description:
                                    'If existent, the email of the user',
                                examples: [null, 'user@example.com']
                            }),
                        isAdmin: z.boolean().meta({
                            description:
                                'Defines whether the user has admin privileges',
                            examples: [false]
                        })
                    })
                    .array(),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                403: ForbiddenResponseZ,
                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
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

        // Check for admin privileges
        if (!req.isAdmin) {
            return res.status(403).send({
                statusCode: 403,
                code: 'NOT_AN_ADMIN',
                error: 'Forbidden',
                message: 'You need admin rights to access this route'
            })
        }

        const users = await db
            .select({
                id: usersTable.id,
                username: usersTable.username,
                email: usersTable.email,
                isAdmin: usersTable.isAdmin
            })
            .from(usersTable)

        res.status(200)
        await res.send(users)
    }
)
