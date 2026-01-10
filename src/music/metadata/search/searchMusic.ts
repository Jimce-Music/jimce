import searchArtist, { type ArtistSearchResult } from './searchArtist'
import type { SongSearchResult } from './searchSong'
import searchSong from './searchSong'

export interface MusicSearchStreamObject {
    songs: ReadableStream<SongSearchResult>
    artists: ReadableStream<ArtistSearchResult>
    // TODO: Also search playlists and more
}

/**
 * This function can be used to search everything music-related (artists, songs, playlists, etc.). It returns an object of streams, one for every category,
 * as the search is streamed and prefers directly showing local db results, and then, later on, streaming new results
 */
export default function searchMusic(query: string): MusicSearchStreamObject {
    const streamObj: MusicSearchStreamObject = {
        songs: searchSong(query),
        artists: searchArtist(query)
    }

    return streamObj
}
