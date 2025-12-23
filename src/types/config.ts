import * as z from 'zod'

export default z.object({
  server: z.object(
    {
      port: z.number('Port must be a number!')
    },
    'server must be an object!'
  )
})
