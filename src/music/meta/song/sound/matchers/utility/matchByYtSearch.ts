// Sub script of all yt matchers to match when no hints were provided

import config from '../../../../../../config'
import MatchingError from '../../../../MatchingError'
import type { GenericSoundSchemeT } from '../../GenericSoundScheme'
import yts from 'yt-search'

export type KnownInfoT = {
    title: string
    lengthInSeconds: number
    artistName: string
}

export default async function matchByYtSearch(
    knownInfo: KnownInfoT
): Promise<GenericSoundSchemeT | MatchingError> {
    // 1. Generate query based on known info and yt search suffix
    const durationTolerance =
        config.metadataProviders.youtube.allowedDurationToleranceInSeconds
    const suffix: string = config.metadataProviders.youtube.searchSuffix ?? ''
    const query = `${knownInfo.title} ${knownInfo.artistName}${suffix ? ' ' + suffix : ''}`

    // 2. Fetch videos based on query
    const ytResult = await yts(query) // TODO: Handle 302 and other errors
    const videos = ytResult.videos

    // Iterate over the videos
    const matches: GenericSoundSchemeT[] = []
    for (const video of videos) {
        // 3. Compare duration while including an allowed tolerance
        const isTooShort =
            video.duration.seconds <
            knownInfo.lengthInSeconds - durationTolerance
        const isTooLong =
            video.duration.seconds >
            knownInfo.lengthInSeconds + durationTolerance

        if (isTooShort || isTooLong) {
            continue // => Skip possible match, bc of duration mismatch
        } else {
            // 4. Retrieve necessary fields
            matches.push({
                providedBy: 'youtube',

                identifierFields: {
                    'yt:id': video.videoId
                }
            })
        }
    }

    // 5. Return first match (or err)
    if (!matches[0])
        return new MatchingError(
            'Failed to match generic metadata with a yt id'
        )
    return matches[0]
}
