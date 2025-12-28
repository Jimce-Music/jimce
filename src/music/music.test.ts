import searchSong from './metadata/search/searchSong'
import { mb } from './musicbrainz'
import yts from 'yt-search'

// This is a temporary file to try out the metadata fetching functions
// console.log(await searchSong('Bella Napoli')) // id: c6d49f0b-951f-407c-b803-c066e4ff3c6c

// Then look it up
// console.log(await mb.lookup('release', 'c6d49f0b-951f-407c-b803-c066e4ff3c6c'))
// PROBLEM: MusicBrainz shows unpopular songs on first rank

// Let's try to search via YT
const r = await yts('bella napoli')

const videos = r.videos.slice(0, 3)
videos.forEach(function (v) {
    const views = String(v.views).padStart(10, ' ')
    console.log(
        `${views} | ${v.title} (${v.timestamp}) | ${v.author.name} | ${v.videoId}`
    )
    console.log(v)
})

// That works better, but now we need a well-balanced way to search for songs and still get a mbid
// console.log(await searchSong('Bella Napoli (Xtreme Sound Party Mix)'))
// console.log(await mb.lookup('release', 'c6d49f0b-951f-407c-b803-c066e4ff3c6c'))
