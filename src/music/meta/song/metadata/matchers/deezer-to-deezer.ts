import * as z from 'zod'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'
import type { Track } from 'jimce-deezer-api-ts'
import type { JimceArtistT } from '../../../artist/JimceArtist'
import logger from '../../../../../logger'
import db from '../../../../../db'
import { artistsTable } from '../../../../../db/schema'
import { eq } from 'drizzle-orm'
import { sleep } from 'bun'

/**
 * Extracts metadata according to the GenericMetadataScheme from an already fetched result. This avoids unnecessary doubled API calls.
 * @param result Fetched result (track)
 */
export async function extractDeezerMetadataFromResult(
    result: Track
): Promise<GenericMetadataSchemeT> {
    return {
        providedBy: 'deezer',

        title: result.title,
        lengthInSeconds: result.duration,
        artists: [await matchArtistDeezer(result)],
        artistQualifiedName: result.artist.name,
        image: result.album.cover_big,
        hints: {}
    }
}

export async function matchArtistDeezer(result: Track): Promise<JimceArtistT> {
    let deezerId = result.artist.id
    if (typeof deezerId === 'number') {
        deezerId = Math.round(deezerId) // ensure it's an int

        // If deezerId exists and useful, try to identify artist based on that
        const artistMatches = await db
            .select()
            .from(artistsTable)
            .where(eq(artistsTable.deezerId, deezerId))
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

    // not found via deezer id, try to identify by name
    async function fetchArtistByName() {
        const artistMatches = await db
            .select()
            .from(artistsTable)
            .where(eq(artistsTable.name, result.artist.name))
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
    const inserted = await db
        .insert(artistsTable)
        .values({
            name: result.artist.name,
            deezerId: result.artist.id
        })
        .onConflictDoNothing()
        .returning({ id: artistsTable.id })

    let newId: string | undefined =
        Array.isArray(inserted) && inserted[0]
            ? inserted[0].id
            : (inserted as any).id
    if (newId === undefined) {
        // invalid, refetch; probably invalid bc of previous conflict (race condition)
        const artistByName = await fetchArtistByName()
        if (artistByName) newId = artistByName.artistId
    }
    logger.info(`Created new artist: ${newId}: ${result.artist.name}`)

    return {
        name: result.artist.name,
        artistId: `${newId}`
    }
}

/**
 * Takes a search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchDeezerSearchToDeezerMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT> {
    // Try to match based on the following cases

    // Not providedBy 'deezer'
    if (searchResult.providedBy !== 'deezer')
        throw new Error(
            'Search result must be provided by deezer to use deezer-to-deezer matcher!'
        )

    // Metadata already provided as hint
    return await extractDeezerMetadataFromResult(
        searchResult.hints.deezer.fullFetchedData
    )
}
