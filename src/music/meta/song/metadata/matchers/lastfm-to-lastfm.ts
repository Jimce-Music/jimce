import type { Track } from '@spotify/web-api-ts-sdk'
import * as z from 'zod'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'

/**
 * Takes a last.fm search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchLastfmSearchToLastfmMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT> {
    // Try to match based on the following cases

    // Not providedBy 'lastfm'
    if (searchResult.providedBy !== 'lastfm')
        throw new Error(
            'Search result must be provided by lastfm to use lastfm-to-lastfm matcher!'
        )
}
