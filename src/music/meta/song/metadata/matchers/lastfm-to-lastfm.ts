import type { Track } from '@spotify/web-api-ts-sdk'
import * as z from 'zod'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'
import { LastFMTrack } from 'lastfm-ts-api'
import MatchingError from '../../../MatchingError'

/**
 * Takes a last.fm search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchLastfmSearchToLastfmMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT | MatchingError> {
    // Try to match based on the following cases

    // Not providedBy 'lastfm'
    if (searchResult.providedBy !== 'lastfm')
        throw new Error(
            'Search result must be provided by lastfm to use lastfm-to-lastfm matcher!'
        )

    // Check if lastfm API enabled
    if (!config.metadataProviders.lastfm.enable)
        throw Error('LastFM provider not enabled')

    const trackApi = new LastFMTrack(
        config.metadataProviders.lastfm.clientId ?? '',
        config.metadataProviders.lastfm.clientSecret
    )

    const trackInfo = await trackApi.getInfo({
        track: searchResult.title,
        artist: searchResult.hints.lastfm.artistString
    })

    const duration = Math.floor(parseInt(trackInfo.track.duration) / 1000)

    if (duration === 0) {
        // Last.fm has no duration information for this track
        // Thus, we would not be able to match it to a sound provider later on
        // We have to return a MatchingError
        return new MatchingError(
            `lastfm-to-lastfm: Failed to match track ${searchResult.title} by ${searchResult.hints.lastfm.artistString} because no duration information was found on last.fm`
        )
    }

    // Get image
    let imageUrl: string
    // FIXME: Waiting for a response on <https://github.com/scriptex/lastfm-ts-api/issues/53>. Until then, we need to manually check for undefined
    if (
        typeof trackInfo.track.album === 'undefined' ||
        typeof trackInfo.track.album.image === 'undefined' ||
        trackInfo.track.album.image.length <= 0
    ) {
        // No album cover found, falling back to a matching error
        return new MatchingError(
            `lastfm-to-lastfm: Failed to match track ${searchResult.title} by ${searchResult.hints.lastfm.artistString} because no image was found`
        )
    } else {
        const images = trackInfo.track.album.image.map((img) => {
            return { src: img['#text'], size: img.size }
        })

        // Find image with best resolution
        const sizeOrder: Record<string, number> = {
            small: 1,
            medium: 2,
            large: 3,
            extralarge: 4
        }
        images.sort((a: (typeof images)[0], b: (typeof images)[0]) => {
            const aSizeValue = sizeOrder[a.size] || 0 // Unexpected values --> 0
            const bSizeValue = sizeOrder[b.size] || 0
            return bSizeValue - aSizeValue // Descending order
        })

        if (images[0]) {
            imageUrl = images[0].src
        } else {
            // No img found
            return new MatchingError(
                `lastfm-to-lastfm: Failed to match track ${searchResult.title} by ${searchResult.hints.lastfm.artistString} because no image was found`
            )
        }
    }

    // Construct metadata object
    return {
        providedBy: 'lastfm',

        title: searchResult.title,
        lengthInSeconds: duration,
        artistQualifiedName: trackInfo.track.artist.name,
        image: imageUrl,

        hints: {}
    }
}
