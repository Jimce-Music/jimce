import { mb } from '../../../musicbrainz'
import type SearchResult from './SearchResultI'
import config from '../../../../config'
import logger from '../../../../logger'
import { v4 as uuidv4 } from 'uuid'
import yts from 'yt-search'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

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
    const resultMap: {
        [id: string]: SongSearchResult
    } = {}

    let openConnections = 0
    let closedConnections = 0
    function closeIfDone(controller: ReadableStreamDefaultController) {
        // Closes the stream / controller once every open connection was closed
        if (openConnections === closedConnections) {
            controller.close()
        }
    }

    const stream: ReadableStream<SongSearchResult> =
        new ReadableStream<SongSearchResult>({
            async start(controller) {
                // controller.enqueue('hello')
                // controller.enqueue('world')
                // console.log(config)

                // Concurrently search all sources
                // MusicBrainz
                openConnections += 1
                mb.search('release', { query })
                    .then((mbResults) => {
                        for (const mbResult of mbResults.releases) {
                            // First prepare a SearchResult
                            const resultId = uuidv4()
                            const result: SearchResult = {
                                uuid: resultId,
                                title: mbResult.title,
                                mbid: mbResult.id,
                                src: [
                                    {
                                        provider: 'musicbrainz',
                                        link: mbResult.id
                                    }
                                ],
                                matchScore: mbResult.score,
                                relevancyScore: 5, // TODO: get actual score
                                sortScore: mbResult.score // TODO: actual calc
                            }
                            // Save it
                            if (resultMap[resultId]) {
                                // Need to merge, already existent
                                // TODO: implement
                            } else {
                                resultMap[resultId] = result
                            }

                            // Stream it
                            controller.enqueue(result)
                        }
                        // Close connection
                        closedConnections += 1
                        closeIfDone(controller)
                    })
                    .catch((err) => {
                        logger.error(`MusicBrainz search for ${query} failed:`)
                        logger.error(err)
                        closedConnections += 1
                        closeIfDone(controller)
                    })
                // YouTube
                openConnections += 1
                yts(query)
                    .then((ytResults) => {
                        for (const video of ytResults.videos) {
                            // Prepare result
                            // TODO: match with mb, etc..
                            const resultId = uuidv4()
                            const result: SongSearchResult = {
                                uuid: resultId,
                                title: video.title,
                                artist: {
                                    name: video.author.name,
                                    src: [
                                        {
                                            provider: 'youtube',
                                            link: video.author.url
                                        }
                                    ]
                                },
                                matchScore: 5, // TODO: populate data
                                relevancyScore: video.views, // TODO: relevance by views and yt order
                                sortScore: video.views, // TODO: actual
                                src: [
                                    {
                                        provider: 'youtube',
                                        link: video.videoId
                                    }
                                ]
                            }

                            // Save it
                            if (resultMap[resultId]) {
                                // Need to merge, already existent
                                // TODO: implement
                            } else {
                                resultMap[resultId] = result
                            }

                            // Stream it
                            controller.enqueue(result)
                        }

                        // Close connection
                        closedConnections += 1
                        closeIfDone(controller)
                    })
                    .catch((err) => {
                        logger.error(`YouTube search for ${query} failed:`)
                        logger.error(err)
                        closedConnections += 1
                        closeIfDone(controller)
                    })
                // Spotify
                if (config.metadataProviders.spotify.enable) {
                    openConnections += 1
                    const spotifySdk = SpotifyApi.withClientCredentials(
                        `${config.metadataProviders.spotify.clientId}`,
                        `${config.metadataProviders.spotify.clientSecret}`
                    )

                    // TODO: query Spotify separate and unite artist & song query
                    spotifySdk
                        .search(query, ['track'])
                        .then((spotifyResults) => {
                            for (const spotifyResult of spotifyResults.tracks
                                .items) {
                                const resultId = uuidv4()
                                const result: SongSearchResult = {
                                    uuid: resultId,
                                    title: spotifyResult.name,
                                    src: [
                                        {
                                            provider: 'spotify',
                                            link: spotifyResult.id
                                        }
                                    ],
                                    artist: {
                                        name: spotifyResult.artists
                                            .map((a) => a.name)
                                            .join('; '),
                                        src: [
                                            {
                                                provider: 'spotify',
                                                link: spotifyResult.artists
                                                    .map((a) => a.id)
                                                    .join('; ')
                                            }
                                        ]
                                    },
                                    relevancyScore: spotifyResult.popularity,
                                    matchScore: 5, // TODO: derive from result order
                                    sortScore: spotifyResult.popularity
                                }
                                // Save it
                                if (resultMap[resultId]) {
                                    // Need to merge, already existent
                                    // TODO: implement
                                } else {
                                    resultMap[resultId] = result
                                }

                                // Stream it
                                controller.enqueue(result)
                            }
                            // Close connection
                            closedConnections += 1
                            closeIfDone(controller)
                        })
                        .catch((err) => {
                            logger.error(`Spotify search for ${query} failed:`)
                            logger.error(err)
                            closedConnections += 1
                            closeIfDone(controller)
                        })
                }
            }
        })

    return stream
}
