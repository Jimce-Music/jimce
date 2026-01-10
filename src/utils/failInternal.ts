import type { FastifyReply } from 'fastify'
import logger from '../logger'

export default function (res: FastifyReply, err: unknown, importerURL: string) {
    logger.error(`Error in route ${importerURL}`)
    logger.error(err)
    res.status(500).send({
        statusCode: 500,
        code: 'ERR_INTERNAL',
        error: 'Internal Server Error',
        message: `An internal server error occurred. Please contact an admin and ask him to check the server logs at ${new Date().toLocaleString()}.`
    })
    return
}
