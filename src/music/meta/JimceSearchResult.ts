import * as z from 'zod'

export const JimceSongSearchResultZ = z.object({
    name: z.string(),
    artistName: z.string()
})

export type JimceSongSearchResult = z.infer<typeof JimceSongSearchResultZ>

/**
 * might be used later on to combine song and artist search
 */
export type JimceSearchResult = JimceSongSearchResult // | JimceArtistSearchResult
