// Unit test for deezer search provider
import { expect, test, describe } from 'bun:test'
import findByQuery from '../../../../../../../src/music/meta/song/search/providers/deezer'
import MatchingError from '../../../../../../../src/music/meta/MatchingError'
describe('[Music] Deezer search provider', async () => {
    //! Search for an example song
    test('Should find never gonna give you up', async () => {
        const res = await findByQuery('Never gonna give you up')

        expect(res instanceof MatchingError).toBeFalse()
        expect(res).toBeArray()
        expect(res).not.toBeEmpty()

        let foundSong = false
        if (res instanceof MatchingError) return
        for (const song of res) {
            if (song.title.toLowerCase().includes('give you up'))
                foundSong = true
        }

        expect(foundSong).toBeTrue()
    })
})
