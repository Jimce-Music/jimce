import * as z from 'zod'

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

    metadataProviders: z.object({
        // Spotify
        spotify: z
            .object({
                enable: z.boolean(),
                apiKey: z.string().min(2).optional()
            })
            .superRefine((data, ctx) => {
                if (data.enable && !data.apiKey) {
                    ctx.addIssue({
                        path: ['apiKey'],
                        message: 'apiKey is required, if enable is set to true',
                        code: 'custom'
                    })
                }
            }),
        // YouTube
        youtube: z.object({
            enable: z.boolean()
        }),
        // The Audio DB
        theAudioDb: z.object({
            enable: z.boolean(),
            apiKey: z.string().min(2).default('123')
        })
        // MusicBrainz does not need an key and is always used
    })
})
