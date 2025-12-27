// ROUTE: /api/auth/check-token
// METHOD: GET
// NAME: Check-token

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
import InternalServerErrorResponseZ from '../../../../types/InternalServerErrorResponseZ'
import UnauthorizedResponseZ from '../../../../types/UnauthorizedResponseZ'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/auth/check-token',
    {
        schema: {
            hide: false,
            summary: '', // TODO: Add summary and description
            description: ``, // Expandable, more detailed description
            
            response: {
                200: z.literal('OK'),
                400: BadRequestResponseZ,
                401: UnauthorizedResponseZ,
                500: InternalServerErrorResponseZ
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        res.status(200)

        await res.send('OK')
    }
)
