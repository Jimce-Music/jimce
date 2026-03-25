import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import config from '../../../../../config'
import { JimceDeezerAPI } from 'jimce-deezer-api-ts'
import MatchingError from '../../../MatchingError'

export const deezer = new JimceDeezerAPI()

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[] | MatchingError> {
    if (!config.metadata.providers.deezer)
        return new MatchingError('Deezer provider not enabled')

    const results = await deezer.search(query)

    const adaptedResults: GenericSearchSchemeT[] = []

    for (const result of results.data) {
        // console.log(`Deezer Debug ${result.artist.name}`)
        adaptedResults.push({
            providedBy: 'deezer',

            title: result.title,
            lengthInSeconds: result.duration,

            // Hints make it easier for metadata / sound matchers to determine a match based on ids or urls
            hints: {
                deezer: {
                    id: result.id,
                    fullFetchedData: result
                }
            }
        })
    }

    return adaptedResults
}
