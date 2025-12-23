import pino from 'pino'
import path from 'path'

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: path.join(process.cwd(), 'jimce.log') }
    },
    {
      target: 'pino/file' // logs to the standard output by default
    }
  ]
})

export default pino({}, transport)
