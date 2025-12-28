import { mb } from '../../musicbrainz'

export default async function searchSong(query: string) {
    const result = await mb.search('release', {
        query
    })

    return result.releases
}
