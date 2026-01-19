import fastify from '../fastify'
import * as z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'

fastify.get(
    '*',
    {
        schema: {
            response: {
                404: z.string().meta({
                    description: 'A 404 Not Found error message or page.'
                })
            },
            hide: true // -> Hides it in the OpenAPI.json spec
        }
    },
    (req: FastifyRequest, res: FastifyReply) => {
        res.status(404)
        res.send('Sorry, but this page does not exist.')
    }
)
