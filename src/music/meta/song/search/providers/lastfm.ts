import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import config from '../../../../../config'
import { LastFMTrack } from 'lastfm-ts-api'

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[]> {
    if (!config.metadataProviders.lastfm.enable)
        throw Error('LastFM provider not enabled')

    const trackApi = new LastFMTrack(
        config.metadataProviders.lastfm.clientId ?? '',
        config.metadataProviders.lastfm.clientSecret
    )

    const results = await trackApi.search({ track: query })

    const adaptedResults: GenericSearchSchemeT[] = []

    for (const result of results.results.trackmatches.track) {
        // const trackInfo = await trackApi.getInfo({
        //     track: result.name,
        //     artist: result.artist
        // })
        // const duration = parseInt(trackInfo.track.duration)
        // console.log(trackInfo.track.duration)

        adaptedResults.push({
            providedBy: 'lastfm',

            title: result.name,

            // length: duration !== 0 ? duration : undefined,

            // Hints make it easier for metadata / sound matchers to determine a match based on ids or urls
            hints: {
                lastfm: {
                    mbid: result.mbid.length === 36 ? result.mbid : undefined,
                    artistString: result.artist,
                }
            }
        })
    }

    // Consideration: Now keep results in order, but prefer results with mbid (show first), as they tend to be more popular

    return adaptedResults
}
