// ROUTE: /api/whoami
// METHOD: GET
// NAME: Whoami

import fastify from '../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'
import logger from '../../logger'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().get(
    '/api/whoami',
    {
        schema: {
            hide: false,

            response: {
                200: z.literal('OK'),
                400: z.object({
                    statusCode: z.literal(400),
                    code: z.string().meta({
                        description: 'Internal code describing the error',
                        examples: ['FST_ERR_VALIDATION']
                    }),
                    error: z.literal('Bad Request'),
                    message: z.string().meta({
                        description: 'Error message describing what went wrong'
                    })
                })
            }
        } satisfies FastifyZodOpenApiSchema
    },
    async (req, res) => {
        res.status(200)

        await res.send('OK')
    }
)
