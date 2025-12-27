import * as z from 'zod'

export default z
    .object({
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
    .meta({
        description:
            'A response sent by the server when your request is malformed (Code 400)',
        id: '400-bad-request-response'
    })
