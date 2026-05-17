import { and, eq } from 'drizzle-orm'
import db from '../../db'
import { songsTable } from '../../db/schema'
import type { JimceSongSearchResult } from '../../music/meta/JimceSearchResult'
import { Asset, buildAssetURIFromUUID } from '../../utils/assets'
import logger from '../../logger'

/**
 * This function takes in a JimceSongSearchResult and applies the knowledge about this song into the jimce database. This ensures a wider
 * variety of song recommendation, faster search times and cached sound / images.
 */
export async function mapResultToDB(
    song: Partial<JimceSongSearchResult>
): Promise<Partial<JimceSongSearchResult>> {
    if (!song.name) return song // No need to even try mapping if name not present

    // Try to identify song with this name and artist in db
    async function fetchSongByName() {
        const matches = await db
            .select()
            .from(songsTable)
            .where(
                and(
                    eq(songsTable.name, `${song.name}`),
                    eq(
                        songsTable.artistIds,
                        song.artists?.map((a) => a.artistId) || []
                    )
                )
            )

        let match: (typeof matches)[0] | null = null
        if (matches.length > 0 && matches[0]) match = matches[0]
        return match
    }
    let match = await fetchSongByName()
    let newId: string

    if (match) {
        // Return JimceSongSearchResult with id and data updated from db
        let img: string | undefined
        if (match.coverImagePreview) {
            img = await buildAssetURIFromUUID(match.coverImagePreview)
        } else {
            img = undefined
        }

        return {
            songId: match.id,
            name: match.name,
            artistName: song.artistName,
            artists: song.artists,
            image: img
        }
    } else {
        let newId: string | undefined

        // Add song to db
        const newDbEntry = await db
            .insert(songsTable)
            .values({
                name: `${song.name}`,
                artistIds: song.artists?.map((a) => a.artistId) || [],
                downloaded: false
            })
            .onConflictDoNothing()
            .returning()

        // Handle race condition for adding songs at the same time
        newId =
            Array.isArray(newDbEntry) && newDbEntry[0]
                ? newDbEntry[0].id
                : (newDbEntry as any).id
        if (newId === undefined) {
            // invalid, refetch; probably invalid bc of previous conflict (race condition)
            const songByName = await fetchSongByName()
            if (songByName) newId = songByName.id
        }

        // Start image asset download only once song id is known
        if (song.image && newId) {
            try {
                await Asset.fromURL(song.image, async (success) => {
                    if (success) {
                        logger.info(
                            `Successfully downloaded cover image for song ${song.name} by ${song.artistName}`
                        )
                    } else {
                        logger.info(
                            `As asset download for image for song ${song.name} by ${song.artistName} failed, songsTable stays without cover image`
                        )
                    }
                }).then(async (asset) => {
                    await db
                        .update(songsTable)
                        .set({
                            coverImage: asset.id,
                            coverImagePreview: asset.id // TODO: Register job to resize to a good preview size after downloading the asset
                        })
                        .where(eq(songsTable.id, newId))
                })
            } catch (err) {
                logger.warn(`Quitting image download in mapResultToDB: ${err}`)
            }
        }

        // return with new id appended
        logger.info(
            `Added new song to database: ${song.name} by ${song.artistName} as ${newId}`
        )
        return {
            songId: newId,
            name: song.name,
            artistName: song.artistName,
            artists: song.artists,
            image: song.image // still use old image while new assets are downloading
        }
    }
}

export async function addSoundToResult(
    songId: string,
    soundSourceObj: { ytid?: string }
) {
    if (Object.keys(soundSourceObj).length === 0) return // no info to add

    try {
        await db
            .update(songsTable)
            .set(soundSourceObj)
            .where(eq(songsTable.id, songId))
    } catch (err) {
        logger.error('Error in addSoundToResult:')
        logger.error(err)
        return
    } finally {
        logger.info(
            `Added ${JSON.stringify(soundSourceObj)} for song ${songId}`
        )
    }
}
