import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import CT_JWT_checks from '../../../components/CT_JWT_checks'
import getBurnerUser from '../../../getBurnerUser'
import * as uuid from 'uuid'
import { eq } from 'drizzle-orm'
import db from '../../../../../src/db'

describe('GET /api/auth/check-token', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/auth/check-token')
    )

    //! Check main functionality
    test('Should return payload of a valid token', async () => {
        const user = await getBurnerUser(true)

        // Get users from API
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/auth/check-token',
            headers: {
                authorization: `Bearer ${user.jwt}`
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().isAdmin).toBeTrue()
        expect(res.json().payload.username).toBe(user.username)
    })
})
