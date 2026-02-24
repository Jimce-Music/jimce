import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'

// Zod / actual type declaration

// Base Zod types for scheme, later on extended based on "providedBy" field
const BaseZ = z.object({
    title: z.string(),
    lengthInSeconds: z.number().positive(),
    // artists: [...] coming soon, list of artists with serverside id, maybe connect to musicbrainz always
    artistQualifiedName: z.string().meta({
        description:
            'The artist name in a standard, qualified form. => Likely to not be a Lyrics Video Channel name but the actual artist'
    })
})

// Actual Zod type
export const GenericMetadataSchemeZ = z.discriminatedUnion('providedBy', [
    // providedBy === 'spotify'
    BaseZ.extend({
        providedBy: z.literal('spotify'),
        hints: z.object({
            spotify: z.object({
                id: z.string()
                // fullMetadata: GenericMetadataSchemeZ.optional() // -> cannot be carried on because it would result in recursion
            })
        })
    }),

    // providedBy === 'youtube'
    BaseZ.extend({
        providedBy: z.literal('youtube'),
        hints: z.object({
            youtube: z.object({})
        })
    })
])

// TS Type
export type GenericMetadataSchemeT = z.infer<typeof GenericMetadataSchemeZ>
