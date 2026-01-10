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
                clientId: z.string().min(2).optional(),
                clientSecret: z.string().min(2).optional()
            })
            .superRefine((data, ctx) => {
                if (data.enable && (!data.clientId || !data.clientSecret)) {
                    ctx.addIssue({
                        path: ['clientId', 'clientSecret'],
                        message:
                            'clientId and clientSecret are required, if enable is set to true',
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
