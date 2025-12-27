import * as z from 'zod'

export default z
    .object({
        statusCode: z.literal(401),
        code: z.string().meta({
            description: 'Internal code describing the error',
            examples: ['FST_JWT_NO_AUTHORIZATION_IN_HEADER']
        }),
        error: z.literal('Unauthorized'),
        message: z.string().meta({
            description: 'Error message describing what went wrong'
        })
    })
    .meta({
        description:
            'A response sent by the server when your request is not authorized',
        id: '401-unauthorized-response'
    })
