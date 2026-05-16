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
import {
    addSoundToResult,
    mapResultToDB
} from '../../jobs/songdb/addResultToDB'

// minimal state like
type MinimalState<T> = {
    get: () => T
    set: (v: T) => void
}
export function ministate<T>(initialValue: T): MinimalState<T> {
    let value: T = initialValue

    return {
        get() {
            return value
        },

        set(v) {
            value = v
        }
    }
}

// Handles execution of all flows
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
    for (const [preferredFlowIndex, preferredFlow] of config.metadata.flows.preferred.entries()) {
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
                        `Search flow #${preferredFlowIndex + 1} failed`
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
        for (const [fallbackFlowIndex, fallbackFlow] of config.metadata.flows.fallback.entries()) {
            try {
                const retv = await executeFlow(
                    fallbackFlow,
                    query,
                    searchResults
                )

                if (retv === true) {
                    logger.info(
                        `Fallback flow #${fallbackFlowIndex + 1} was successful`
                    )
                    return searchResults.close()
                } else {
                    logger.warn(
                        `Fallback search flow #${fallbackFlowIndex + 1} failed`
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

// Used for a single flow
/**
 * @returns true when successful, or err message when failing at stage 1
 */
async function executeFlow(
    flow: (ProviderIdentifierT | 'auto')[],
    query: string,
    searchResults: StreamableResultList<JimceSongSearchResult>
): Promise<true | string> {
    let stage2or3Errors = ministate(0)
    const STAGE_2_OR_3_ERROR_THRESHOLD = 8

    return new Promise(async (resolveFlow, rejectFlow) => {
        if (flow.length !== 3) throw 'Config flow has incorrect length'

        logger.info(`Executing flow: ${flow.join(', ')}`)

        let wasInvalid = false
        function invalid(): 'auto' {
            wasInvalid = true
            throw resolveFlow('provider may not be undefined')
        }

        let searchProvider = flow[0] ?? invalid()
        let metadataProvider = flow[1] ?? invalid()
        let soundProvider = flow[2] ?? invalid()
        if (wasInvalid) return

        async function stage1(
            searchFn: (
                query: string
            ) => Promise<GenericSearchSchemeT[] | MatchingError>
        ) {
            return await handleStage1(searchFn, query, {
                searchProvider,
                metadataProvider,
                soundProvider,
                flow,

                resolveFlow,
                rejectFlow,

                searchResults,

                STAGE_2_OR_3_ERROR_THRESHOLD,
                stage2or3Errors
            })
        }

        if (searchProvider === 'auto') {
            searchProvider = 'deezer' // TODO: Change based on activated providers or throw if no recommendation exists
        }

        switch (searchProvider) {
            case 'deezer':
                await stage1(deezerSearch)
                break
            default:
                return resolveFlow(`Unhandled search provider: ${searchProvider}`)
        }

        return resolveFlow(true) // Success
        // TODO: Add all other providers
    })
}

// Handle different stages (inside of executeFlow)
async function handleStage1(
    searchFn: (
        query: string
    ) => Promise<GenericSearchSchemeT[] | MatchingError>,
    query: string,
    multiple: {
        searchProvider: ProviderIdentifierT | 'auto'
        metadataProvider: ProviderIdentifierT | 'auto'
        soundProvider: ProviderIdentifierT | 'auto'
        flow: (ProviderIdentifierT | 'auto')[]

        resolveFlow: (value: string | true | PromiseLike<string | true>) => void
        rejectFlow: (reason?: any) => void

        searchResults: StreamableResultList<JimceSongSearchResult>

        STAGE_2_OR_3_ERROR_THRESHOLD: number
        stage2or3Errors: MinimalState<number>
    }
): Promise<void> {
    const {
        resolveFlow,
        rejectFlow,
        STAGE_2_OR_3_ERROR_THRESHOLD,
        stage2or3Errors,
        flow,
        searchResults
    } = multiple

    // modifiable bc may be overwritten when === 'auto'
    let { searchProvider, metadataProvider, soundProvider } = multiple

    const r1all = await searchFn(query)
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

                if (metadataProvider === 'auto') {
                    switch (searchProvider) {
                        case 'deezer':
                            metadataProvider = 'deezer'
                            break
                        default:
                            metadataProvider = 'deezer'
                            break
                    }
                }

                // ### Stage 2
                let r2: GenericMetadataSchemeT | MatchingError
                if (metadataProvider === 'deezer') {
                    switch (searchProvider) {
                        case 'deezer':
                            r2 = await matchDeezerSearchToDeezerMetadata(r1)
                            break
                        default:
                            logger.error(
                                'Error in stage 2: was not able to identify matching function'
                            )
                            r2 = new MatchingError(
                                'Error in stage 2: was not able to identify matching function'
                            )
                            break
                    }
                } /*else if (...) {...}*/ else {
                    logger.error(
                        'Error in stage 2: was not able to identify matching function'
                    )
                    r2 = new MatchingError(
                        'Error in stage 2: was not able to identify matching function'
                    )
                }

                if (r2 instanceof MatchingError) {
                    // ! Errors here must be counted. just a few are fine -> skip. but multiple result in a fallback flow needed
                    stage2or3Errors.set(stage2or3Errors.get() + 1)
                    if (stage2or3Errors.get() > STAGE_2_OR_3_ERROR_THRESHOLD) {
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
                const r2Res = await r2ToRes(r2)
                result.extend(r2Res)

                // ### Stage 3
                // Match to sound
                if (soundProvider === 'auto') {
                    switch (metadataProvider) {
                        case 'deezer':
                            soundProvider = 'youtube'
                            break
                        default:
                            soundProvider = 'youtube'
                            break
                    }
                }

                let r3: GenericSoundSchemeT | MatchingError
                if (soundProvider === 'youtube') {
                    // default case:
                    r3 = new MatchingError(
                        'Error in stage 3: was not able to identify matching function'
                    )

                    // good cases:
                    if (metadataProvider === 'deezer')
                        r3 = await matchDeezerMetadataToYoutubeSound(r2)
                } /*else if (soundProvider === '...')*/ else {
                    logger.error(
                        'Error in stage 3: was not able to identify matching function'
                    )
                    r3 = new MatchingError(
                        'Error in stage 3: was not able to identify matching function'
                    )
                }
                if (r3 instanceof MatchingError) {
                    // ! Errors here must be counted. just a few are fine -> skip. but multiple result in a fallback flow needed
                    stage2or3Errors.set(stage2or3Errors.get() + 1)
                    if (stage2or3Errors.get() > STAGE_2_OR_3_ERROR_THRESHOLD) {
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
                result.extend(await r3ToRes(r3, r2Res.songId ?? 'dummysong'))

                resolve()
            })
        )
    }
    await Promise.allSettled(promises) // wait until all done
}

// ###### Mapping functions: map GenericXScheme to a JimceSongSearchResult

function r1ToRes(r1: GenericSearchSchemeT): Partial<JimceSongSearchResult> {
    return {
        name: r1.title
    }
}

async function r2ToRes(
    r2: GenericMetadataSchemeT
): Promise<Partial<JimceSongSearchResult>> {
    return await mapResultToDB({
        name: r2.title,
        artistName: r2.artistQualifiedName,
        artists: r2.artists,
        image: r2.image
    })
}

async function r3ToRes(
    r3: GenericSoundSchemeT,
    songId: string
): Promise<Partial<JimceSongSearchResult>> {
    await addSoundToResult(songId, {
        ytid: r3.identifierFields['yt:id']
    })

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
