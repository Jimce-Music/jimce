import { eq } from 'drizzle-orm'
import db from '../../../../../../db'
import { artistsTable } from '../../../../../../db/schema'
import type { JimceArtistT } from '../../../../artist/JimceArtist'
import logger from '../../../../../../logger'

export async function matchArtistViaMBID(knownInfo: {
    mbid?: string
    name: string
}): Promise<JimceArtistT> {
    let mbid = knownInfo.mbid
    if (typeof mbid === 'string' && mbid.length > 4) {
        // If mbid exists and useful, try to identify artist based on that
        const artistMatches = await db
            .select()
            .from(artistsTable)
            .where(eq(artistsTable.mbid, mbid))
        if (artistMatches.length > 0) {
            const artistMatch = artistMatches[0]
            if (artistMatch) {
                return {
                    name: artistMatch.name,
                    artistId: artistMatch.id
                }
            }
        }
    }

    // not found via mbid, try to identify by name
    async function fetchArtistByName() {
        const artistMatches = await db
            .select()
            .from(artistsTable)
            .where(eq(artistsTable.name, knownInfo.name))
        if (artistMatches.length > 0 && artistMatches[0]) {
            const artistMatch = artistMatches[0]

            return {
                name: artistMatch.name,
                artistId: artistMatch.id
            }
        }
    }
    const artistByName = await fetchArtistByName()
    if (artistByName) return artistByName

    // does not exist in db at all, create new
    let inserted
    if (typeof mbid === 'string' && mbid.length > 4) {
        inserted = await db
            .insert(artistsTable)
            .values({
                name: knownInfo.name,
                mbid: mbid
            })
            .onConflictDoNothing()
            .returning({ id: artistsTable.id })
    } else {
        inserted = await db
            .insert(artistsTable)
            .values({
                name: knownInfo.name
            })
            .onConflictDoNothing()
            .returning({ id: artistsTable.id })
    }

    let newId: string | undefined =
        Array.isArray(inserted) && inserted[0]
            ? inserted[0].id
            : (inserted as any).id
    if (newId === undefined) {
        // invalid, refetch; probably invalid bc of previous conflict (race condition)
        const artistByName = await fetchArtistByName()
        if (artistByName) newId = artistByName.artistId
    }
    logger.info(`Created new artist: ${newId}: ${knownInfo.name}`)

    return {
        name: knownInfo.name,
        artistId: `${newId}`
    }
}
