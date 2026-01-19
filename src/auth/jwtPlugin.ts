import fastifyJwt from '@fastify/jwt'
import fp from 'fastify-plugin'
import config from '../config'
import logger from '../logger'
import { JWTPayloadZ, type JWTPayloadT } from '../types/JWTPayload'
import UnauthorizedResponseZ from '../types/UnauthorizedResponseZ'
import * as z from 'zod'
import db from '../db'
import { usersTable } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default fp(async (fastify: FastifyInstance) => {
    await fastify.register(fastifyJwt, {
        secret: config.auth.jwt_secret
    })

    await fastify.decorateRequest('isAdmin', false) // Makes permissions field available and false by default

    await fastify.decorate('authenticate', async (req: FastifyRequest, res: FastifyReply) => {
        try {
            await req.jwtVerify() // Check if token is valid

            // Check if token expired
            let tokenPayload: JWTPayloadT
            try {
                tokenPayload = JWTPayloadZ.parse(req.user)
            } catch (err) {
                logger.warn('Found token with an invalid payload:')
                logger.info(req.user, 'Token')
                logger.warn(err)
                const client_err: z.infer<typeof UnauthorizedResponseZ> = {
                    statusCode: 401,
                    code: 'INVALID_JWT_PAYLOAD',
                    error: 'Unauthorized',
                    message:
                        'The token payload is invalid. Please contact an admin to check the server logs and make sure to use a different token.'
                }
                return res.status(401).send(client_err)
            }

            const expired = Date.now() > tokenPayload.validUntil.getTime()
            if (expired) {
                const client_err: z.infer<typeof UnauthorizedResponseZ> = {
                    statusCode: 401,
                    code: 'EXPIRED_JWT',
                    error: 'Unauthorized',
                    message: `The provided token has expired since ${tokenPayload.validUntil.toLocaleDateString()}.`
                }
                return res.status(401).send(client_err)
            }

            // Check if user (still) exists and information is valid
            const matchingUsers = await db
                .select()
                .from(usersTable)
                .where(
                    and(
                        eq(usersTable.id, tokenPayload.id),
                        eq(usersTable.username, tokenPayload.username)
                    )
                )

            if (matchingUsers.length > 0) {
                // Valid data, user still exists
                // Retrieve permissions
                const isAdmin = matchingUsers[0]?.isAdmin || false
                req.isAdmin = isAdmin
                // req.user = tokenPayload
            } else {
                const client_err: z.infer<typeof UnauthorizedResponseZ> = {
                    statusCode: 401,
                    code: 'USER_NOT_FOUND',
                    error: 'Unauthorized',
                    message: `Even though the provided token is valid, the user has either been deleted or changed the username / id since the token was issued.`
                }
                return res.status(401).send(client_err)
            }
        } catch (err) {
            logger.error('Error during jwt auth')
            logger.error(err)
            return
            // if (
            //     typeof err === 'object' &&
            //     err !== null &&
            //     'message' in err &&
            //     typeof err.message === 'string'
            // ) {
            //     if (err.message.includes('token is malformed')) {
            //         // Just malformed token
            //         const client_err: z.infer<typeof UnauthorizedResponseZ> = {
            //             statusCode: 401,
            //             code: 'MALFORMED_JWT',
            //             error: 'Unauthorized',
            //             message: `The provided token is malformed.`
            //         }
            //         return res.status(401).send(client_err)
            //     } else if (
            //         (err.message.includes('No Authorization was found in') &&
            //             err.message.includes('header')) ||
            //         (err.message.includes('[ERR_ASSERTION]') &&
            //             err.message.includes('missing token'))
            //     ) {
            //         // No token found
            //         const client_err: z.infer<typeof UnauthorizedResponseZ> = {
            //             statusCode: 401,
            //             code: 'NO_TOKEN_FOUND',
            //             error: 'Unauthorized',
            //             message: `No Authorization header was found`
            //         }
            //         return res.status(401).send(client_err)
            //     } else {
            //         return failInternal(res, err, import.meta.url)
            //     }
            // } else {
            //     return failInternal(res, err, import.meta.url)
            // }
        }
    })
})
