// This will read the config
import * as z from 'zod'
import ConfigZ from './types/ConfigZ'
import logger from './logger'

export type ConfigT = z.infer<typeof ConfigZ>

export function parseEnvVarsInConfig(config: ConfigT): ConfigT {
    // Recursively find all strings / literals in config
    function rewriteStringsRecursive<T>(obj: T | any): T {
        for (const entry of Object.keys(obj)) {
            if (typeof obj[entry] === 'string') {
                // Found literal
                const literal = obj[entry]
                if (literal.startsWith('${') && literal.endsWith('}')) {
                    // Replace with env var
                    const VAR_NAME = literal.substring(2, literal.length - 1)
                    obj[entry] = process.env[VAR_NAME]
                }
                // if not ${} syntax, leave untouched
            } else if (obj[entry] instanceof Object) {
                // Array or object, call this function again
                obj[entry] = rewriteStringsRecursive<any>(obj[entry])
            }
            // else: leave untouched
        }
        return obj
    }

    // Return config
    return rewriteStringsRecursive(config)
}

import config_raw from '../config.yml'
let config: z.infer<typeof ConfigZ>
try {
    config = ConfigZ.parse(config_raw)
    config = parseEnvVarsInConfig(config)
} catch (err) {
    logger.error(err)
    logger.fatal('Config is invalid, see the error above')
    process.exit(1)
}

export default config
