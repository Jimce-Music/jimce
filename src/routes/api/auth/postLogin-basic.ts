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
import meta from '../../../meta'
import config from '../../../config'
import BadRequestResponseZ from '../../../types/BadRequestResponseZ'
import InternalServerErrorResponseZ from '../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../types/UnauthorizedResponseZ'
import { JWTPayloadZ, type JWTPayloadT } from '../../../types/JWTPayload'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().post(
    '/api/auth/login-basic',
    {
        schema: {
            hide: false,
            summary: 'Login via basic auth',
            description: `Ask server to issue a JWT based on user & password credentials`, // Expandable, more detailed description

            body: z.object({}),

            response: {
                200: z.object({
                    token: z.string().meta({
                        description:
                            'The Json Web Token (JWT) issued by the server',
                        examples: [
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
                        ]
                    })
                }),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        // FIXME: Check login data before issuing token

        const tokenPayload: JWTPayloadT = {
            id: '5b9e340c-38ba-4495-b895-c3aee230134e',
            username: 'test.user',
            validUntil: new Date(
                Date.now() +
                    2 * /*hours*/ 60 /*mins*/ * 60 /*secs*/ * 1_000 /*ms*/
            )
            // TODO: Use actual db data
        }

        const token = fastify.jwt.sign(JWTPayloadZ.parse(tokenPayload))

        res.send({ token })
    }
)
