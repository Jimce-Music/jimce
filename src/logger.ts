import pino from 'pino'
import path from 'path'
import fsExtra from 'fs-extra'

// Ensure ./logs directory
await fsExtra.ensureDir(path.join(process.cwd(), 'logs'))

// Init logger
const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: {
                destination: path.join(process.cwd(), 'logs', 'jimce.log')
            }
        },
        {
            target: 'pino/file' // logs to the standard output by default
        }
    ]
})

export default pino({}, transport)
