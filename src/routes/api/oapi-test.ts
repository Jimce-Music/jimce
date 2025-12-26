import fastify from '../../fastify'
import * as z from 'zod'
import {
    type FastifyZodOpenApiSchema,
    type FastifyZodOpenApiTypeProvider
} from 'fastify-zod-openapi'

fastify.withTypeProvider<FastifyZodOpenApiTypeProvider>().post(
    '/api/test-oapi/:jobId',
    {
        schema: {
            body: z.object({
                jobId: z.string().meta({
                    description: 'Job ID',
                    example: '60002023'
                })
            }),
            response: {
                201: z.object({
                    jobId: z.string().meta({
                        description: 'Job ID',
                        examples: ['60002023']
                    })
                }),
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
        res.status(201)
        await res.send({ jobId: req.body.jobId })
    }
)
