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
        let oneSuccessful = false
        // Check for pending flows
        for (const state of preferredFlowDoneStates) {
            if (state === false) {
                allDone = false
            }
            if (state === true) {
                oneSuccessful = true
            }
        }

        // Close once no more flows are pending and at least one was successful
        if (allDone && oneSuccessful) {
            // Close list
            logger.info('Search was successful')
            return searchResults.close()
        }

        if (allDone && !oneSuccessful) {
            // No more pending but also no successful flows
            // ! Time to execute fallback flows
            logger.warn(
                'As no flows were successful, fallback flows will now be run'
            )
            runFallbackFlows()
        }
    }

    // Execute all preferred flows at the same time
    for (const preferredFlow of config.metadata.flows.preferred) {
        const i = preferredFlowDoneStates.push(false) - 1

        // Execute all flow stages
        executeFlow(preferredFlow, query, searchResults)
            .then((retv) => {
                if (retv === true) {
                    // Flow was successful
                    // Mark flow as done
                    preferredFlowDoneStates[i] = true
                    maybeDone()
                } else {
                    // Flow failed. Log that. Not a problem unless all flows fail
                    logger.warn(
                        `Search flow ${preferredFlow.join(', ')} failed`
                    )
                    preferredFlowDoneStates[i] = 'failed'
                    maybeDone()
                }
            })
            .catch((err) => {
                logger.error('Search flow failed in searchSongs.ts:')
                logger.error(err)
                preferredFlowDoneStates[i] = 'failed'
                maybeDone()
            })
    }

    // Code for fallback flows
    async function runFallbackFlows() {
        for (const fallbackFlow of config.metadata.flows.fallback) {
            try {
                const retv = await executeFlow(
                    fallbackFlow,
                    query,
                    searchResults
                )

                if (retv === true) {
                    logger.info(
                        `Fallback flow ${fallbackFlow.join(', ')} was successful`
                    )
                    return searchResults.close()
                } else {
                    logger.warn(
                        `Fallback search flow ${fallbackFlow.join(', ')} failed`
                    )
                }
            } catch (err) {
                logger.error('Search flow failed in searchSongs.ts:')
                logger.error(err)
            }
        }

        logger.error(
            'Search was not successful at all: Every preferred and fallback flow failed'
        )
        searchResults.close()
    }

    return searchResults
}

/**
 * @returns true when successful, or err message when failing at stage 1
 */
async function executeFlow(
    flow: (ProviderIdentifierT | 'auto')[],
    query: string,
    searchResults: StreamableResultList<JimceSongSearchResult>
): Promise<true | string> {
    let stage2or3Errors = 0
    const STAGE_2_OR_3_ERROR_TRESHOLD = 8

    return new Promise(async (resolveFlow, rejectFlow) => {
        if (flow.length !== 3) throw 'Config flow has incorrect length'

        logger.info(`Executing flow: ${flow.join(', ')}`)

        let wasInvalid = false
        function invalid(): 'auto' {
            throw resolveFlow('provider may not be undefined')
            wasInvalid = true
        }

        let searchProvider = flow[0] ?? invalid()
        let metadataProvider = flow[1] ?? invalid()
        let soundProvider = flow[2] ?? invalid()
        if (wasInvalid) return

        if (searchProvider === 'auto') {
            searchProvider = 'deezer' // TODO: Change based on activated providers or throw if no recommendation exists
        } else if (searchProvider === 'deezer') {
            const r1all = await deezerSearch(query)
            if (r1all instanceof MatchingError) {
                return resolveFlow(
                    `Flow failed in stage 1: ${r1all.name} ${r1all.message} ${r1all.cause} ${r1all.stack}`
                )
            }
            const promises: Promise<void>[] = []
            for (const r1 of r1all) {
                promises.push(
                    new Promise(async (resolve, reject) => {
                        const result = searchResults.publish(r1ToRes(r1))

                        // TODO: only continue if flow says 'deezer'
                        const r2 = await matchDeezerSearchToDeezerMetadata(r1)
                        if (r2 instanceof MatchingError) {
                            // ! Errors here must be counted. just a few are fine -> skip. but multiple result in a fallback flow needed
                            stage2or3Errors += 1
                            if (stage2or3Errors > STAGE_2_OR_3_ERROR_TRESHOLD) {
                                // Fallback flow necessary
                                return resolveFlow(
                                    `Flow failed in stage 2: ${r2.name} ${r2.message} ${r2.cause} ${r2.stack}`
                                )
                            } else {
                                // Just log it
                                logger.warn(
                                    `Search flow ${flow.join(', ')} resulted in a stage 2 error. Still continuing...`
                                )
                                return reject('MatchingError') // just exits this result, not whole flow
                            }
                        }
                        result.extend(r2ToRes(r2))

                        // Match to sound
                        const r3 = await matchDeezerMetadataToYoutubeSound(r2)
                        if (r3 instanceof MatchingError) {
                            // ! Errors here must be counted. just a few are fine -> skip. but multiple result in a fallback flow needed
                            stage2or3Errors += 1
                            if (stage2or3Errors > STAGE_2_OR_3_ERROR_TRESHOLD) {
                                // Fallback flow necessary
                                return resolveFlow(
                                    `Flow failed in stage 3: ${r3.name} ${r3.message} ${r3.cause} ${r3.stack}`
                                )
                            } else {
                                // Just log it
                                logger.warn(
                                    `Search flow ${flow.join(', ')} resulted in a stage 3 error. Still continuing...`
                                )
                                return reject('MatchingError') // just exits this result, not whole flow
                            }
                        }
                        result.extend(r3ToRes(r3))

                        resolve()
                    })
                )
            }
            await Promise.allSettled(promises) // wait until all done
        }

        return resolveFlow(true) // Success
        // TODO: Add all other providers
    })
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
