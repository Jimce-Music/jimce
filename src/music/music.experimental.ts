// ! New experiments

import { sleep } from 'bun'
import { matchSpotifySearchToSpotifyMetadata } from './meta/song/metadata/matchers/spotify-to-spotify'
import spotifySearch from './meta/song/search/providers/spotify'
import { matchSpotifyMetadataToYoutubeSound } from './meta/song/sound/matchers/spotify-to-youtube'

// Search for a song
const search = await spotifySearch('Bella Napoli')
// console.log(search)
for (const sRes of search) {
    const meta = await matchSpotifySearchToSpotifyMetadata(sRes)
    console.log(
        '----------------------------------------------------------------------------------------------'
    )
    console.log(meta)
    console.log('------>')
    const sound = await matchSpotifyMetadataToYoutubeSound(meta)
    console.log(sound)

    // wait to avoid rate limiting
    // await sleep(1100)
}
// TODO: De-duplify results, Handle no results errors for every matching process
// TODO: Make search use (custom) streams anywhere, so that if metadata arrives, results are already streamed and invalidated later in stream when sound matching runs
// => necessary to achieve instant reactivity

// ! Old stuff from search.old
// import searchMusic from './meta.song/search.old/searchMusic'
// import type { SearchResult } from 'yt-search'

// This is a temporary file to try out the metadata fetching functions
// console.log(await searchSong('Bella Napoli')) // id: c6d49f0b-951f-407c-b803-c066e4ff3c6c

// Then look it up
// console.log(await mb.lookup('release', 'c6d49f0b-951f-407c-b803-c066e4ff3c6c'))
// PROBLEM: MusicBrainz shows unpopular songs on first rank

// Let's try to search via YT
// const r = await yts('bella napoli')

// const videos = r.videos.slice(0, 3)
// videos.forEach(function (v) {
//     const views = String(v.views).padStart(10, ' ')
//     console.log(
//         `${views} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${v.videoId}`
//     )
//     console.log(v)
// })

// That works better, but now we need a well-balanced way to search for songs and still get a mbid
// console.log(await searchSong('Bella Napoli (Xtreme Sound Party Mix)'))
// console.log(await mb.lookup('release', 'c6d49f0b-951f-407c-b803-c066e4ff3c6c'))

// Lets' test our new functions
// const query = 'Bella Napoli'
// const search = searchMusic(query)
// const items = []
// for await (const item of search.songs) {
//     items.push({
//         uuid: item.uuid.substring(0, 8),
//         title: item.title.substring(0, 60),
//         source: item.src[0]?.provider,
//         score: item.sortScore
//     })
// }
// console.table(items)
// NOTE: Considerations so far:
/*  - We need a uniform sort score, applicable to all providers
    - YouTube and Spotify sort based on what the user wants, MusicBrainz just shows the best match for the query
    - We should try to search via Spotify / YouTube first, and then try to match with MusicBrainz in order to have a unique mbid and proper metadata
    - Later on we could use something like TheAudioDB for cover art and more
*/

// for (const [type, stream] of Object.entries(search)) {
//     // Every type
//     if (type === 'artists') continue // DEBUG SKIP

//     for await (const chunk of stream) {
//         // console.log(`New ${type} entry:`)
//         // console.log(chunk)
//         console.table({
//             uuid: chunk.uuid,
//             title: chunk.title.substring(0, 20),
//             src: chunk.src[0].provider
//         })
//     }
// }
