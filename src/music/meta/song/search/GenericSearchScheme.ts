import * as z from 'zod'
import { ProviderIdentifierZ } from '../../ProviderIdentifierT'

// Zod / actual type declaration
export const GenericSearchSchemeZ = z.object({
    title: z.string(),
    lengthInSeconds: z.number().positive(),
    providedBy: ProviderIdentifierZ,

    hints: z.object({
        spotify: z.object({
            id: z.string()
        })
    })
})

// TS Type
export type GenericSearchSchemeT = z.infer<typeof GenericSearchSchemeZ>
