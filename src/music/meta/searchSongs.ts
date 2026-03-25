// This will search for songs, artists, etc. and provide a StreamableResultList updating from time to time

import { StreamableResultList } from 'streamed-result-list'
import type { JimceSongSearchResult } from './JimceSearchResult'

export default function searchSongs(
    query: string
): StreamableResultList<JimceSongSearchResult> {
    const searchResults = new StreamableResultList<JimceSongSearchResult>()

    return searchResults
}
