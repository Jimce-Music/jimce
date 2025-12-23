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
    })
})
