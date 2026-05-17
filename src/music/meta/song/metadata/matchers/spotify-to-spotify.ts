import type { SimplifiedArtist, Track } from '@spotify/web-api-ts-sdk'
import * as z from 'zod'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import config from '../../../../../config'
import type { GenericMetadataSchemeT } from '../GenericMetadataScheme'
import type { GenericSearchSchemeT } from '../../search/GenericSearchScheme'
import naturalLangEnumerate from '../../../../../utils/naturalLangEnumerate'
import MatchingError from '../../../MatchingError'
import type { JimceArtistT } from '../../../artist/JimceArtist'
import db from '../../../../../db'
import { artistsTable } from '../../../../../db/schema'
import { eq } from 'drizzle-orm'
import logger from '../../../../../logger'

export async function matchSpotifyArtists(
    artists: SimplifiedArtist[]
): Promise<JimceArtistT[]> {
    let artistsReturned: JimceArtistT[] = []

    for (const artist of artists) {
        let id = artist.id
        if (typeof id === 'string' && id.length > 4) {
            // If id exists and useful, try to identify artist based on that
            const artistMatches = await db
                .select()
                .from(artistsTable)
                .where(eq(artistsTable.spotifyId, id))
            if (artistMatches.length > 0) {
                const artistMatch = artistMatches[0]
                if (artistMatch) {
                    artistsReturned.push({
                        name: artistMatch.name,
                        artistId: artistMatch.id
                    })
                    continue
                }
            }
        }

        // not found via id, try to identify by name
        async function fetchArtistByName() {
            const artistMatches = await db
                .select()
                .from(artistsTable)
                .where(eq(artistsTable.name, artist.name))
            if (artistMatches.length > 0 && artistMatches[0]) {
                const artistMatch = artistMatches[0]

                return {
                    name: artistMatch.name,
                    artistId: artistMatch.id
                }
            }
        }
        const artistByName = await fetchArtistByName()
        if (artistByName) {
            artistsReturned.push(artistByName)
            continue
        }

        // does not exist in db at all, create new
        let inserted
        if (typeof id === 'string' && id.length > 4) {
            inserted = await db
                .insert(artistsTable)
                .values({
                    name: artist.name,
                    spotifyId: id
                })
                .onConflictDoNothing()
                .returning({ id: artistsTable.id })
        } else {
            inserted = await db
                .insert(artistsTable)
                .values({
                    name: artist.name
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
        logger.info(`Created new artist: ${newId}: ${artist.name}`)

        artistsReturned.push({
            name: artist.name,
            artistId: `${newId}`
        })
        continue
    }

    return artistsReturned
}

/**
 * Extracts metadata according to the GenericMetadataScheme from an already fetched spotify result. This avoids unnecessary doubled API calls.
 * @param result Fetched spotify result (track)
 */
export async function extractSpotifyMetadataFromResult(
    result: Track
): Promise<GenericMetadataSchemeT> {
    return {
        providedBy: 'spotify',

        title: result.name,
        lengthInSeconds: Math.floor(result.duration_ms / 1000),
        artistQualifiedName: naturalLangEnumerate(
            result.artists,
            (artist) => artist.name
        ),
        artists: await matchSpotifyArtists(result.artists),
        hints: {
            spotify: {
                id: result.id
            }
        }
    }
}

/**
 * Takes a spotify search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchSpotifySearchToSpotifyMetadata(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT | MatchingError> {
    // Check if spotify is enabled
    if (!config.metadata.providers.spotify) {
        return new MatchingError('spotify provider not enabled')
    }

    const spotifySdk = SpotifyApi.withClientCredentials(
        `${config.metadata.providers.spotify?.clientId}`,
        `${config.metadata.providers.spotify?.clientSecret}`
    )

    // Try to match based on the following cases

    // Not providedBy 'spotify'
    if (searchResult.providedBy !== 'spotify')
        throw new Error(
            'Search result must be provided by spotify to use spotify-to-spotify matcher!'
        )

    // Metadata already provided as hint
    if (searchResult.hints.spotify.fullMetadata) {
        return searchResult.hints.spotify.fullMetadata
    }

    // Only spotify id hint available
    // Fetch track data from API
    const trackData = await spotifySdk.tracks.get(searchResult.hints.spotify.id)
    return await extractSpotifyMetadataFromResult(trackData)
}
