import type { Track } from '@spotify/web-api-ts-sdk'
import * as z from 'zod'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'

const spotifySdk = SpotifyApi.withClientCredentials(
    `${config.metadataProviders.spotify.clientId}`,
    `${config.metadataProviders.spotify.clientSecret}`
)

/**
 * Extracts metadata according to the GenericMetadataScheme from an already fetched spotify result. This avoids unnecessary doubled API calls.
 * @param result Fetched spotify result (track)
 */
export function extractSpotifyMetadataFromResult(
    result: Track
): GenericMetadataSchemeT {
    return {
        providedBy: 'spotify',

        title: result.name,
        lengthInSeconds: Math.floor(result.duration_ms / 1000),
        artistQualifiedName: naturalLangEnumerate(
            result.artists,
            (artist) => artist.name
        ),
        hints: {
            spotify: {
                id: result.id
            }
        }
    }
}

/**
 * Takes a spotify search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchSpotifySearchToSpotifyMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT> {
    // Try to match based on the following cases

    // Not providedBy 'spotify'
    if (searchResult.providedBy !== 'spotify')
        throw new Error(
            'Search result must be provided by spotify to use spotify-to-spotify matcher!'
        )

    // Metadata already provided as hint
    if (searchResult.hints.spotify.fullMetadata) {
        return searchResult.hints.spotify.fullMetadata
    }

    // Only spotify id hint available
    // Fetch track data from API
    const trackData = await spotifySdk.tracks.get(searchResult.hints.spotify.id)
    return extractSpotifyMetadataFromResult(trackData)
}
