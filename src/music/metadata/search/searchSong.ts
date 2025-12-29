import { mb } from '../../musicbrainz'
import type SearchResult from './SearchResultI'
import config from '../../../config'

// Old function for testing, may be removed later
// export default async function searchSong(query: string) {
//     const result = await mb.search('release', {
//         query
//     })

//     return result.releases
// }

export interface SongSearchResult extends SearchResult {}

export default function searchSong(
    query: string
): ReadableStream<SongSearchResult> {
    const stream: ReadableStream<SongSearchResult> =
        new ReadableStream<SongSearchResult>({
            async start(controller) {
                // controller.enqueue('hello')
                // controller.enqueue('world')
                // console.log(config)
                controller.close()
                // Main function, search stuff here
            }
        })

    return stream
}
