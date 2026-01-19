import fastify from '../fastify'
import * as z from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'

fastify.get(
    '/',
    {
        schema: {
            response: {
                200: z.string()
            },
            hide: true // -> Hides it in the OpenAPI.json spec
        }
    },
    (req: FastifyRequest, res: FastifyReply) => {
        res.send(
            'This is the Jimce Server speaking, we are doing just fine! For further web client like capabilities, please wait until our frontend dev is done 😉'
        )
    }
)
