import fastify from '../fastify'
import * as z from 'zod'

fastify.get(
    '/',
    {
        schema: {
            response: {
                200: z.string()
            },
            hide: true
        }
    },
    (req, res) => {
        res.send(
            'This is the Jimce Server speaking, we are doing just fine! For further web client like capabilities, please wait until our frontend dev is done 😉'
        )
    }
)
