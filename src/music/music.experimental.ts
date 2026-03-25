// ! New experiments

import { sleep } from 'bun'
import { matchSpotifySearchToSpotifyMetadata } from './meta/song/metadata/matchers/spotify-to-spotify'
import lastfmSearch from './meta/song/search/providers/lastfm'
import deezerSearch from './meta/song/search/providers/deezer'
import { matchSpotifyMetadataToYoutubeSound } from './meta/song/sound/matchers/spotify-to-youtube'
import { matchLastfmSearchToLastfmMetadata } from './meta/song/metadata/matchers/lastfm-to-lastfm'
import { matchDeezerSearchToDeezerMetadata } from './meta/song/metadata/matchers/deezer-to-deezer'
import { matchDeezerMetadataToYoutubeSound } from './meta/song/sound/matchers/deezer-to-youtube'
import MatchingError from './meta/MatchingError'

// Search for a song
// const search = await spotifySearch('Bella Napoli')
// const search = await lastfmSearch('Bella Napoli')
const search = await deezerSearch('Bella Napoli')
// console.log(search)
if (search instanceof MatchingError) {
    console.error(search)
    process.exit(1)
}
for (const sRes of search) {
    // console.log(sRes)
    // const meta = await matchLastfmSearchToLastfmMetadata(sRes)
    const meta = await matchDeezerSearchToDeezerMetadata(sRes)
    console.log(
        '----------------------------------------------------------------------------------------------'
    )
    console.log(meta)
    console.log('------>')
    // const sound = await
    const sound = await matchDeezerMetadataToYoutubeSound(meta)
    console.log(sound)
}
// TODO: De-duplify results, Handle no results errors for every matching process
// TODO: Make search use (custom) streams anywhere, so that if metadata arrives, results are already streamed and invalidated later in stream when sound matching runs
// => necessary to achieve instant reactivity
