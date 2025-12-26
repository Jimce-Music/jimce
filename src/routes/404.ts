import fastify from '../fastify'
import * as z from 'zod'

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
    (req, res) => {
        res.status(404)
        res.send('Sorry, but this page does not exist.')
    }
)
