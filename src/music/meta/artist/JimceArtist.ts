import * as z from 'zod'

export const JimceArtistZ = z.object({
    name: z.string().nonempty(),
    artistId: z.string().nonempty()
})

export type JimceArtistT = z.infer<typeof JimceArtistZ>
