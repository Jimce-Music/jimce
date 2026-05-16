// Integration test for GET /api/search/streamed/search-songs

import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../../../tests/integration/components/CT_JWT_checks'
import getBurnerUser from '../../../../../../tests/integration/getBurnerUser'
import CT_ADMIN_checks from '../../../../../../tests/integration/components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '../../../../../../src/db'
import { usersTable } from '../../../../../../src/db/schema'
import { eq } from 'drizzle-orm'

describe('GET /api/search/streamed/search-songs', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/search/streamed/search-songs?q=oasis'),
        30_000
    )

    //! ?q= must be required
    test('query must be required', async () => {
        const user = await getBurnerUser(false)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/search/streamed/search-songs',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })

        expect(res.statusCode).toBe(400)
    })

    //! Check stream
    test('Chunked stream', async () => {
        const user = await getBurnerUser(false)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/search/streamed/search-songs?q=never+gonna+give+you+up',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })
        // wait for first data chunk, expect it to be initPacket
        const stream = res.stream()
        const data = await new Promise<Buffer>((resolve) =>
            stream.once('data', (data) => resolve(data))
        )
        expect(data.toString().toLowerCase()).toInclude('initpacket')

        await new Promise((resolve) => stream.on('close', resolve)) // wait for stream to end
        expect(res.statusCode).toBe(200)
    }, 30000)

    //! Check for Never gonna give you up by Rick Astley
    test('Check for Never gonna give you up by Rick Astley', async () => {
        const user = await getBurnerUser(false)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/search/streamed/search-songs?q=never+gonna+give+you+up',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })

        // collect data until stream closes
        const stream = res.stream()
        let data = ''
        stream.on('data', (buf) => (data += buf.toString()))
        await new Promise((resolve) => stream.on('close', resolve)) // wait for stream to end
        // check if "astley" included in result
        expect(data.toLowerCase()).toInclude('astley')
        expect(data.toLowerCase()).toInclude('give you up')
    }, 30000)
})
