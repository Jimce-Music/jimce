export default class MatchingError extends Error {
    isMatchingError = true

    constructor(description: string) {
        super(description)
    }
}
