import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import CT_JWT_checks from '../../../components/CT_JWT_checks'
import getBurnerUser from '../../../getBurnerUser'
import * as uuid from 'uuid'
import db from '../../../../../src/db'
import { usersTable } from '../../../../../src/db/schema'
import { eq } from 'drizzle-orm'

describe('GET /api/me/userinfo', async () => {
    //! Check for auth
    test('Authentication works fine', CT_JWT_checks('GET', '/api/me/userinfo'))

    //! Check main functionality
    test('Should return at least id and username', async () => {
        const user = await getBurnerUser(false)

        // Get users from API
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/me/userinfo',
            headers: {
                authorization: `Bearer ${user.jwt}`
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().id).toBeString()
        expect(res.json().username).toBe(user.username)
    })
})
