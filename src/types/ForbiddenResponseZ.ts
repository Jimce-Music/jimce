import * as z from 'zod'

export default z
    .object({
        statusCode: z.literal(403),
        code: z.string().meta({
            description: 'Internal code describing the error',
            examples: ['NOT_AN_ADMIN']
        }),
        error: z.literal('Forbidden'),
        message: z.string().meta({
            description: 'Error message describing what went wrong'
        })
    })
    .meta({
        description:
            'A response sent by the server when lack the required permissions (HTTP 403)',
        id: '403-forbidden-response'
    })
