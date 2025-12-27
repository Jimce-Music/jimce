import * as z from 'zod'

// Codec for ISO-String <-> Date
const stringToDate = z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), {
        message: 'Invalid ISO date string'
    })
    .transform((s) => new Date(s))
    .pipe(z.date()) // stellt sicher, dass das Ergebnis ein Date ist

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
        validUntil: stringToDate.meta({
            description:
                'The timestamp describing when the token will become invalidated',
            examples: ['2025-12-27T18:17:16.990Z']
        })
    })
    .meta({
        title: 'JWT Payload',
        description:
            'The Zod type for a JWT payload which can be accessed via req.user'
    })

export type JWTPayloadT = z.infer<typeof JWTPayloadZ>

export function encodeJWTPayload(payload: JWTPayloadT) {
    return {
        ...payload,
        validUntil: payload.validUntil.toISOString()
    }
}
