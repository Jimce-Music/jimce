import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'

const spotifySdk = SpotifyApi.withClientCredentials(
    `${config.metadataProviders.spotify.clientId}`,
    `${config.metadataProviders.spotify.clientSecret}`
)

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[]> {
    if (!config.metadataProviders.spotify.enable)
        throw Error('Spotify provider not enabled')

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
                    id: result.id
                }
            }
        })
    }

    return adaptedResults
}
