// Integration test for GET /api/dummy/schemas/search-schema

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
import logger from '../../../../../../src/logger'

describe('GET /api/dummy/schemas/search-schema', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/admin/users/list-users') // TODO: Add valid body if required by the endpoint
    )

    //! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('GET', '/api/admin/users/list-users') // TODO: Add valid body if required by the endpoint
    )

    //! Check main functionality
    test('Should return code 204', async () => {
        const user = await getBurnerUser(true)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/dummy/schemas/search-schema',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })
        expect(res.statusCode).toBe(204)
    })
})
