// Integration test for GET /api/search/simple/search-songs

import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../../src/fastify'
import CT_JWT_checks from '../../../../../../tests/integration/components/CT_JWT_checks'
import getBurnerUser from '../../../../../../tests/integration/getBurnerUser'

describe('GET /api/search/simple/search-songs', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/search/simple/search-songs?q=oasis'),
        30_000
    )

    //! Check main functionality
    test('Returns search results for a query', async () => {
        const user = await getBurnerUser(false)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/search/simple/search-songs?q=Bella%20Napoli',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })
        expect(res.statusCode).toBe(200)
        const body = res.json()
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBeGreaterThan(0)
    }, 30_000)
})
