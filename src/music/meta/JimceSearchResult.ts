import * as z from 'zod'

export const JimceSongSearchResultZ = z.object({
    // Metadata
    name: z.string(),
    artistName: z.string(),
    image: z.string().meta({ description: 'Url to the album cover' }),

    // Sound
    sound: z
        .object({
            'yt:id': z.string()
        })
        .partial()
})

export type JimceSongSearchResult = z.infer<typeof JimceSongSearchResultZ>

/**
 * might be used later on to combine song and artist search
 */
export type JimceSearchResult = JimceSongSearchResult // | JimceArtistSearchResult
