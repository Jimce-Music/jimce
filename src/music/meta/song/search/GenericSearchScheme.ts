import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'
import { GenericMetadataSchemeZ } from '../metadata/GenericMetadataScheme'

// Zod / actual type declaration

// Base Zod types for Search Scheme, later on extended based on "providedBy" field
const BaseZ = z.object({
    title: z.string()
})

// Actual Zod type
export const GenericSearchSchemeZ = z.discriminatedUnion('providedBy', [
    // providedBy === 'spotify'
    BaseZ.extend({
        providedBy: z.literal('spotify'),
        lengthInSeconds: z.number().positive(),
        hints: z.object({
            spotify: z.object({
                id: z.string(),
                fullMetadata: GenericMetadataSchemeZ.optional()
            })
        })
    }),

    // providedBy === 'youtube'
    BaseZ.extend({
        providedBy: z.literal('youtube'),
        lengthInSeconds: z.number().positive(),
        hints: z.object({
            youtube: z.object({})
        })
    }),

    // providedBy === 'lastfm'
    BaseZ.extend({
        providedBy: z.literal('lastfm'),
        hints: z.object({
            lastfm: z.object({
                mbid: z.string().length(36).optional(),
                artistString: z.string()
            })
        })
    })
])

// TS Type
export type GenericSearchSchemeT = z.infer<typeof GenericSearchSchemeZ>
