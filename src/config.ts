// This will read the config
import * as z from 'zod'
import ConfigZ from './types/config'
import logger from './logger'

import config_raw from '../config.yml'
let config: z.infer<typeof ConfigZ>
try {
    config = ConfigZ.parse(config_raw)
} catch (err) {
    logger.error(err)
    logger.fatal('Config is invalid, see the error above')
    process.exit(1)
}

export default config
