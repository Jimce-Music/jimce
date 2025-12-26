// This file exports the server instance
import Fastify from 'fastify'
import path from 'path'

const fastify = Fastify({
    logger: {
        file: path.join(process.cwd(), 'jimce-server.log')
    }
})

export default fastify
