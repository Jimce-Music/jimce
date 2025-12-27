import * as z from 'zod'

export default z
    .object({
        statusCode: z.literal(500),
        code: z.string().meta({
            description: 'Internal code describing the error',
            examples: ['FST_ERR_RESPONSE_SERIALIZATION']
        }),
        error: z.literal('Internal Server Error'),
        message: z.string().meta({
            description: 'Error message describing what went wrong',
            examples: ['Response does not match the schema']
        })
    })
    .meta({
        description:
            'A response sent by the server when the server failed to process your request',
        id: '500-internal-server-error-response'
    })
