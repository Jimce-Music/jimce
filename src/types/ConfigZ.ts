import * as z from 'zod'
import { ProviderIdentifierZ } from '../music/meta/ProviderIdentifierT'

export default z.object({
    server: z.object(
        {
            port: z.number('Port must be a number!')
        },
        'server must be an object!'
    ),
    database: z.object({
        user: z.string(),
        password: z.string(),
        db: z.string(),
        port: z.number(),
        host: z.string()
    }),
    auth: z.object({
        jwt_secret: z.string()
    }),

    metadata: z.object({
        providers: z.object({
            deezer: z.object().optional(),
            spotify: z
                .object({
                    clientId: z.string(),
                    clientSecret: z.string()
                })
                .optional(),
            youtube: z
                .object({
                    allowedDurationToleranceInSeconds: z
                        .number()
                        .default(2)
                        .meta({
                            description:
                                'seconds of allowed duration tolerance between metadata and sound'
                        }),
                    searchSuffix: z.string().optional().meta({
                        description:
                            'Optional suffix to append to the search, like "lyrics video"'
                    })
                })
                .optional(),
            lastfm: z
                .object({
                    apiKey: z.string(),
                    secret: z.string()
                })
                .optional()
        }),
        flows: z.object({
            preferred: z.array(
                z
                    .array(z.union([ProviderIdentifierZ, z.literal('auto')]))
                    .length(3)
            ),
            fallback: z.array(
                z
                    .array(z.union([ProviderIdentifierZ, z.literal('auto')]))
                    .length(3)
            )
        })
    })

    // TODO: remove legacy code once new config system is production ready
    // metadataProviders: z.object({
    //     // Spotify
    //     spotify: z
    //         .object({
    //             enable: z.boolean(),
    //             clientId: z.string().min(2).optional(),
    //             clientSecret: z.string().min(2).optional()
    //         })
    //         .superRefine((data, ctx) => {
    //             if (data.enable && (!data.clientId || !data.clientSecret)) {
    //                 ctx.addIssue({
    //                     path: ['clientId', 'clientSecret'],
    //                     message:
    //                         'clientId and clientSecret are required, if enable is set to true',
    //                     code: 'custom'
    //                 })
    //             }
    //         }),
    //     // LastFM
    //     lastfm: z
    //         .object({
    //             enable: z.boolean(),
    //             clientId: z.string().min(2).optional(),
    //             clientSecret: z.string().min(2).optional()
    //         })
    //         .superRefine((data, ctx) => {
    //             if (data.enable && (!data.clientId || !data.clientSecret)) {
    //                 ctx.addIssue({
    //                     path: ['clientId', 'clientSecret'],
    //                     message:
    //                         'clientId and clientSecret are required, if enable is set to true',
    //                     code: 'custom'
    //                 })
    //             }
    //         }),
    //     // YouTube
    //     youtube: z.object({
    //         enable: z.boolean(),
    //         searchSuffix: z.string().optional(),
    //         allowedDurationToleranceInSeconds: z.number().default(2)
    //     }),
    //     // The Audio DB
    //     theAudioDb: z.object({
    //         enable: z.boolean(),
    //         apiKey: z.string().min(2).default('123')
    //     }),
    //     // Deezer
    //     deezer: z.object({
    //         enable: z.boolean()
    //     })
    //     // MusicBrainz does not need an key and is always used
    // })
})
