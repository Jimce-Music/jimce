import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'

// Zod / actual type declaration
export const GenericMetadataSchemeZ = z.object({
    title: z.string(),
    lengthInSeconds: z.number().positive(),
    providedBy: ProviderIdentifierZ
})

// TS Type
export type GenericMetadataSchemeT = z.infer<typeof GenericMetadataSchemeZ>
