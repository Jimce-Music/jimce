export default interface SearchResult {
    /**
     * The uuid of the search result. If the client already received
     * a result with the same uuid, the new result is an extension to the first.
     * The results with the same ids shall be merged by the client
     */
    uuid: string
    /**
     * If found, a musicbrainz id matching the result
     */
    mbid?: string
    /**
     * A list of sources where the data was retrieved from
     */
    src: {
        provider: 'musicbrainz' | 'youtube' | 'spotify' // maybe more later on
        link: string
    }[]
    /**
     * The title / name of the result
     */
    title: string
    /**
     * A number ranging from 0 to 100 describing how well the result
     * matches the query (100 is perfect match). This is partly the base for the sortScore.
     * However this score does not determine how relevant the result
     * is for the user.
     */
    matchScore: number
    /** A score starting at 0 with an open end describing how relevant a
     * result is for the user (higher is better). May be used with log(relevancyScore).
     * Must be combined with the match score, otherwise popular results will
     * always be on top.
     */
    relevancyScore: number
    /** A score starting at 0 with an open end (higher is better) describing
     * the fit of a result as a whole. It is being calculated through the other
     * scores. It can be used for sorting results, and resorting if new ones
     * are found.
     */
    sortScore: number

    coverImage:
        | {
              type: 'data-url'
              url: string
              /** UUID of the asset */
              assetId: string
          }
        | {
              type: 'filePath'
              path: string
              /** UUID of the asset */
              assetId: string
          }
}
