import * as z from 'zod'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'
import type { Track } from 'jimce-deezer-api-ts'

/**
 * Extracts metadata according to the GenericMetadataScheme from an already fetched spotify result. This avoids unnecessary doubled API calls.
 * @param result Fetched spotify result (track)
 */
export function extractDeezerMetadataFromResult(
    result: Track
): GenericMetadataSchemeT {
    return {
        providedBy: 'deezer',

        title: result.title,
        lengthInSeconds: result.duration,
        artistQualifiedName: result.artist.name,
        hints: {}
    }
}

/**
 * Takes a search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchDeezerSearchToDeezerMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT> {
    // Try to match based on the following cases

    // Not providedBy 'deezer'
    if (searchResult.providedBy !== 'deezer')
        throw new Error(
            'Search result must be provided by deezer to use deezer-to-deezer matcher!'
        )

    // Metadata already provided as hint
    return extractDeezerMetadataFromResult(
        searchResult.hints.deezer.fullFetchedData
    )
}
