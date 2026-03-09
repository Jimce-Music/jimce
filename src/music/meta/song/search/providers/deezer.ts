import * as z from 'zod'
import type { GenericSearchSchemeT } from '../GenericSearchScheme'
import config from '../../../../../config'
import { JimceDeezerAPI } from 'jimce-deezer-api-ts'

export const deezer = new JimceDeezerAPI()

export default async function findByQuery(
    query: string
): Promise<GenericSearchSchemeT[]> {
    if (!config.metadataProviders.deezer.enable)
        throw Error('Deezer provider not enabled')

    const results = await deezer.search(query)

    const adaptedResults: GenericSearchSchemeT[] = []

    for (const result of results.data) {
        // console.log(`Deezer Debug ${result.artist.name}`)
        adaptedResults.push({
            providedBy: 'deezer',

            title: result.title,
            lengthInSeconds: result.duration,

            // Hints make it easier for metadata / sound matchers to determine a match based on ids or urls
            hints: {}
        })
    }

    return adaptedResults
}
