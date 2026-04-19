// This will search for songs, artists, etc. and provide a StreamableResultList updating from time to time
// It will also follow the flow according to the config.yml and will also handle errors and fallbacks

import { StreamableResultList } from 'streamed-result-list'
import type { JimceSongSearchResult } from './JimceSearchResult'
import config from '../../config'
import type { ProviderIdentifierT } from './ProviderIdentifierT'
import logger from '../../logger'
import deezerSearch from './song/search/providers/deezer'
import type { GenericSearchSchemeT } from './song/search/GenericSearchScheme'
import MatchingError from './MatchingError'
import { matchDeezerSearchToDeezerMetadata } from './song/metadata/matchers/deezer-to-deezer'
import type { GenericMetadataSchemeT } from './song/metadata/GenericMetadataScheme'
import { matchDeezerMetadataToYoutubeSound } from './song/sound/matchers/deezer-to-youtube'
import type { GenericSoundSchemeT } from './song/sound/GenericSoundScheme'

export default function searchSongs(
    query: string
): StreamableResultList<JimceSongSearchResult> {
    const searchResults = new StreamableResultList<JimceSongSearchResult>()

    const preferredFlowDoneStates: (boolean | 'failed')[] = []
    // Executed once done states change
    function maybeDone() {
        let allDone = true
        for (const state of preferredFlowDoneStates) {
            if (state === false) {
                allDone = false
            }
        }

        if (allDone) {
            // Close list
            searchResults.close()
        }
    }

    // Execute all preferred flows at the same time
    for (const preferredFlow of config.metadata.flows.preferred) {
        const i = preferredFlowDoneStates.push(false) - 1

        // Execute all flow stages
        executeFlow(preferredFlow, query, searchResults)
            .then(() => {
                // Mark flow as done
                preferredFlowDoneStates[i] = true
                maybeDone()
            })
            .catch((err) => {
                logger.error('Search flow failed in searchSongs.ts:')
                logger.error(err)
                preferredFlowDoneStates[i] = 'failed'
                maybeDone()
            })
    }

    return searchResults
}

async function executeFlow(
    flow: (ProviderIdentifierT | 'auto')[],
    query: string,
    searchResults: StreamableResultList<JimceSongSearchResult>
) {
    if (flow.length !== 3) throw 'Config flow has incorrect length'

    logger.info(`Executing flow: ${flow.join(', ')}`)

    function invalid(): 'auto' {
        throw 'provider may not be undefined'
    }

    let searchProvider = flow[0] ?? invalid()
    let metadataProvider = flow[1] ?? invalid()
    let soundProvider = flow[2] ?? invalid()

    if (searchProvider === 'auto') {
        searchProvider = 'deezer' // TODO: Change based on activated providers or throw if no recommendation exists
    } else if (searchProvider === 'deezer') {
        const r1all = await deezerSearch(query)
        if (r1all instanceof MatchingError) {
            // FIXME: Handle matching error correctly
            throw 'MatchingError'
        }
        const pendingFlowStages: Promise<void>[] = []
        for (const r1 of r1all) {
            const result = searchResults.publish(r1ToRes(r1))

            // TODO: only continue if flow says 'deezer'
            const flowStagePromise = matchDeezerSearchToDeezerMetadata(r1)
                .then((r2) => {
                    if (r2 instanceof MatchingError) {
                        // FIXME: Handle matching error correctly
                        throw 'MatchingError'
                    }
                    result.extend(r2ToRes(r2))

                    // Match to sound
                    return matchDeezerMetadataToYoutubeSound(r2)
                })
                .then((r3) => {
                    if (r3 instanceof MatchingError) {
                        // FIXME: Handle matching error correctly
                        throw 'MatchingError'
                    }
                    result.extend(r3ToRes(r3))
                })

            pendingFlowStages.push(flowStagePromise)
        }
        await Promise.all(pendingFlowStages)
    }
    // TODO: Add all other providers
}

function r1ToRes(r1: GenericSearchSchemeT): Partial<JimceSongSearchResult> {
    return {
        name: r1.title
    }
}

function r2ToRes(r2: GenericMetadataSchemeT): Partial<JimceSongSearchResult> {
    return {
        name: r2.title,
        artistName: r2.artistQualifiedName,
        image: r2.image
    }
}

function r3ToRes(r3: GenericSoundSchemeT): Partial<JimceSongSearchResult> {
    return {
        sound: {
            'yt:id': r3.identifierFields['yt:id']
        }
    }
}

export async function checkProviderConfig() {
    // TODO: Check if all providers are configured correctly and all necessary providers for the flows are available
    // TODO: Check this on server start
}

// TODO: Add tests for whole music folder
