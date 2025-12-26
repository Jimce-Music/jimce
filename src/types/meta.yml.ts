import * as z from 'zod'

export default z.object({
    is_dev: z.boolean().meta({
        description: 'Whether this is a Jimce dev build / execution / API state'
    }),
    version: z
        .string()
        .meta({ description: 'Current version string of Jimce server' }),
    openapi_version: z.string().meta({
        description: 'Used OpenAPI version',
        examples: ['3.1.1']
    }),
    execution: z
        .object({
            is_ci_run: z.boolean().meta({
                description:
                    'Describes whether the current run is an automated run (i.e. for CI purposes)'
            }),
            disable_db: z.boolean().meta({
                description:
                    'Mostly relevant when is_ci_run == true: Defines whether to disable database migrations and connections'
            }),
            disable_background_jobs: z.boolean().meta({
                description:
                    'Mostly relevant when is_ci_run == true: Defines whether to disable background jobs like metadata fetching'
            })
        })
        .meta({ description: 'Defines the execution context of the server' })
})
