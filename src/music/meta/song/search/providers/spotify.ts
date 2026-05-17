import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'
import { extractSpotifyMetadataFromResult } from '../../metadata/matchers/spotify-to-spotify'
import MatchingError from '../../../MatchingError'

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[] | MatchingError> {
    if (!config.metadata.providers.spotify)
        return new MatchingError('Spotify provider not enabled')

    const spotifySdk = SpotifyApi.withClientCredentials(
        `${config.metadata.providers.spotify?.clientId}`,
        `${config.metadata.providers.spotify?.clientSecret}`
    )

    const results = await spotifySdk.search(query, ['track'])

    const adaptedResults: GenericSearchSchemeT[] = []

    for (const result of results.tracks.items) {
        adaptedResults.push({
            providedBy: 'spotify',

            title: result.name,
            lengthInSeconds: Math.floor(result.duration_ms / 1000),

            // Hints make it easier for metadata / sound matchers to determine a match based on ids or urls
            hints: {
                spotify: {
                    id: result.id,
                    fullMetadata: await extractSpotifyMetadataFromResult(result)
                }
            }
        })
    }

    return adaptedResults
}
