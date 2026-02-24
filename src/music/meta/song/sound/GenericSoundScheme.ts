import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'

// Zod / actual type declaration
export const GenericSoundSchemeZ = z.discriminatedUnion('providedBy', [
    // providedBy === 'spotify'
    // z.object({
    //     providedBy: z.literal('spotify')
    // }),

    // providedBy === 'youtube'
    z.object({
        providedBy: z.literal('youtube'),

        identifierFields: z.object({
            'yt:id': z.string()
        })
    })
])

// TS Type
export type GenericSoundSchemeT = z.infer<typeof GenericSoundSchemeZ>
