import * as z from 'zod'

export const JWTPayloadZ = z
    .object({
        id: z.string().meta({
            examples: ['5b9e340c-38ba-4495-b895-c3aee230134e'],
            description: 'The uuid of the user'
        }),
        username: z.string().meta({
            examples: ['test.user'],
            description: 'The username of the user'
        }),
        validUntil: z.date().meta({
            description:
                'The timestamp describing when the token will become invalidated'
        })
    })
    .meta({
        title: 'JWT Payload',
        description:
            'The Zod type for a JWT payload which can be accessed via req.user'
    })

export type JWTPayloadT = z.infer<typeof JWTPayloadZ>
