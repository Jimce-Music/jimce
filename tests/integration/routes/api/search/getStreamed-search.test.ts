// Integration test for GET /api/search/streamed-search

import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../../tests/integration/components/CT_JWT_checks'
import getBurnerUser from '../../../../../tests/integration/getBurnerUser'
import CT_ADMIN_checks from '../../../../../tests/integration/components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '../../../../../src/db'
import { usersTable } from '../../../../../src/db/schema'
import { eq } from 'drizzle-orm'

describe('GET /api/search/streamed-search', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/admin/users/list-users') // TODO: Add valid body if required by the endpoint
    )

    

    //! Check main functionality
    test('Main functionality', async () => { // TODO: Add a descriptive title
        const user = await getBurnerUser(false)

        // TODO: Test core functionality
        
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/search/streamed-search',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: process.env.ADMIN_JWT
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
