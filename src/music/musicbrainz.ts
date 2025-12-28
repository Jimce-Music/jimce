import { MusicBrainzApi } from 'musicbrainz-api'
import meta from '../meta'

export const mb = new MusicBrainzApi({
    // Contact data
    appName: 'Jimce',
    appVersion: meta.version,
    appContactInfo: 'jimce@cabraviva.de',

    // Optional: Disable rate limiting (default: false)
    disableRateLimiting: false,

    // Optional: Set max number of request with X seconds
    //           (default: 15 requests every 18 seconds)
    rateLimit: [15, 18]
})
