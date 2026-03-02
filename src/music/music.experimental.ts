// ! New experiments

import { sleep } from 'bun'
import { matchSpotifySearchToSpotifyMetadata } from './meta/song/metadata/matchers/spotify-to-spotify'
import lastfmSearch from './meta/song/search/providers/lastfm'
import { matchSpotifyMetadataToYoutubeSound } from './meta/song/sound/matchers/spotify-to-youtube'
import { matchLastfmSearchToLastfmMetadata } from './meta/song/metadata/matchers/lastfm-to-lastfm'

// Search for a song
// const search = await spotifySearch('Bella Napoli')
const search = await lastfmSearch('Bella Napoli')
// console.log(search)
for (const sRes of search) {
    // console.log(sRes)
    const meta = await matchLastfmSearchToLastfmMetadata(sRes)
    console.log(
        '----------------------------------------------------------------------------------------------'
    )
    console.log(meta)
    // console.log('------>')
    // const sound = await matchSpotifyMetadataToYoutubeSound(meta)
    // console.log(sound)

    // wait to avoid rate limiting
    // await sleep(1100)
}
// TODO: De-duplify results, Handle no results errors for every matching process
// TODO: Make search use (custom) streams anywhere, so that if metadata arrives, results are already streamed and invalidated later in stream when sound matching runs
// => necessary to achieve instant reactivity
