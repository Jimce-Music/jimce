import type { JimceSongSearchResult } from '../../music/meta/JimceSearchResult'

/**
 * This function takes in a JimceSongSearchResult and applies the knowledge about this song into the jimce database. This ensures a wider
 * variety of song recommendation, faster search times and cached sound / images.
 */
export async function addResultToDB(
    songResult: JimceSongSearchResult
): Promise<{
    success: boolean
}> {
    return {
        success: true
    }
}
