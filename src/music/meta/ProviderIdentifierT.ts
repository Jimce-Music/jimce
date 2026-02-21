import * as z from 'zod'

export const ProviderIdentifierZ = z.union([
    // <-- any of
    z.literal('spotify'),
    z.literal('youtube')
])

export type ProviderIdentifierT = z.infer<typeof ProviderIdentifierZ>
