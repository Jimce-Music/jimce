import type MatchingError from '../../../MatchingError'
import type { GenericMetadataSchemeT } from '../../metadata/GenericMetadataScheme'
import type { GenericSoundSchemeT } from '../GenericSoundScheme'
import matchByYtSearch from './utility/matchByYtSearch'

/**
 * Takes a spotify metadata result (according to GenericMetadataScheme) as input and matches it to a GenericSoundScheme
 */
export async function matchSpotifyMetadataToYoutubeSound(
    result: GenericMetadataSchemeT
): Promise<GenericSoundSchemeT | MatchingError> {
    // Try to match based on the following cases
    // 1. Match only based on Generic Metadata, no hints
    return await matchByYtSearch({
        title: result.title,
        lengthInSeconds: result.lengthInSeconds,
        artistName: result.artistQualifiedName
    })
}
