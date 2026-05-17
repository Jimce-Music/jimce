import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import config from '../../../../../config'
import { LastFMTrack } from 'lastfm-ts-api'
import MatchingError from '../../../MatchingError'

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[] | MatchingError> {
    if (!config.metadata.providers.lastfm)
        return new MatchingError('LastFM provider not enabled')

    const trackApi = new LastFMTrack(
        config.metadata.providers.lastfm.apiKey ?? '',
        config.metadata.providers.lastfm.secret
    )

    const results = await trackApi.search({ track: query })

    const adaptedResults: GenericSearchSchemeT[] = []

    for (const result of results.results.trackmatches.track) {
        adaptedResults.push({
            providedBy: 'lastfm',

            title: result.name,

            // Hints make it easier for metadata / sound matchers to determine a match based on ids or urls
            hints: {
                lastfm: {
                    artistString: result.artist
                },
                musicbrainz:
                    result.mbid.length === 36
                        ? {
                              mbid: result.mbid
                          }
                        : undefined
            }
        })
    }

    // Consideration: Now keep results in order, but prefer results with mbid (show first), as they tend to be more popular

    return adaptedResults
}
