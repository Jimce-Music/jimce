import * as z from 'zod'

export default z
    .object({
        success: z.boolean().meta({
            description: 'States whether the requested action was successful'
        }),
        reason: z
            .string()
            .optional()
            .meta({
                description:
                    'An optional reason for the success or fail of your requested action',
                examples: ['User already exists']
            })
    })
    .meta({
        description:
            'A response sent by the server when your request is valid to indicate whether it was successful or not',
        id: 'success-indicator-response'
    })
