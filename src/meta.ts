// This will read the meta.yml
import * as z from 'zod'
import MetaZ from './types/meta.yml.ts'
import logger from './logger'

import meta_raw from '../meta.yml'
let meta: z.infer<typeof MetaZ>
try {
    meta = MetaZ.parse(meta_raw)
} catch (err) {
    logger.error(err)
    logger.fatal('meta.yml is invalid, see the error above')
    process.exit(1)
}

export default meta
