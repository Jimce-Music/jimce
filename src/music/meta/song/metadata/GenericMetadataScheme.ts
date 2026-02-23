import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'

// Zod / actual type declaration
export const GenericMetadataSchemeZ = z.object({
    title: z.string(),
    lengthInSeconds: z.number().positive(),
    providedBy: ProviderIdentifierZ,
    // artists: [...] coming soon, list of artists with serverside id, maybe connect to musicbrainz always
    artistQualifiedName: z.string().meta({
        description:
            'The artist name in a standard, qualified form. => Likely to not be a Lyrics Video Channel name but the actual artist'
    })
})

// TS Type
export type GenericMetadataSchemeT = z.infer<typeof GenericMetadataSchemeZ>
