import { expect, test, describe } from 'bun:test'
import searchSongs, { ministate } from '../../../../src/music/meta/searchSongs'
// TODO: write unit tests here

describe('[Music] searchSongs', async () => {
    // ! MiniState
    test('ministate', () => {
        const state = ministate(0)
        expect(state.get()).toBe(0)
        state.set(2)
        expect(state.get()).toBe(2)
    })

    // ! Full searchSongs run (config based...)
    test('config based searchSongs run', async () => {
        const srl = searchSongs("don't look back in anger")
        await new Promise((res) => srl.onClose(res))
        const songs = srl.asArray()

        let oneCorrect = false
        for (const song of songs) {
            if (
                song.artistName?.toLowerCase().includes('oasis') &&
                song.name?.toLowerCase().includes('anger') &&
                song.sound?.['yt:id']?.length !== undefined &&
                song.sound['yt:id'].length > 1
            )
                oneCorrect = true
        }

        expect(oneCorrect).toBeTrue()
    }, 30_000)
})
