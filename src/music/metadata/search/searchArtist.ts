import { mb } from '../../musicbrainz'

// Old function for testing, may be removed later
// export default async function searchSong(query: string) {
//     const result = await mb.search('release', {
//         query
//     })

//     return result.releases
// }

export interface ArtistSearchResult {}

export default function searchSong(
    query: string
): ReadableStream<ArtistSearchResult> {
    const stream: ReadableStream<ArtistSearchResult> =
        new ReadableStream<ArtistSearchResult>({
            start(controller) {
                controller.enqueue('hello-artist')
                controller.enqueue('world-artist')
                controller.close()
            }
        })

    return stream
}
