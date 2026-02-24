/**
 * Takes a spotify search result (according to GenericSearchScheme) as input and matches it to a GenericMetadataScheme
 */
export async function matchSpotifyMetadataToYoutubeSound(
    searchResult: GenericSearchSchemeT
): Promise<GenericMetadataSchemeT> {
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
    return extractSpotifyMetadataFromResult(trackData)
}
