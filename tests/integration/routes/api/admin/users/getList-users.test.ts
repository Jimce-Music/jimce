import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../components/CT_JWT_checks'
import getBurnerUser from '../../../../getBurnerUser'
import CT_ADMIN_checks from '../../../../components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '../../../../../../src/db'
import { usersTable } from '../../../../../../src/db/schema'
import { eq } from 'drizzle-orm'

describe('GET /api/admin/users/list-users', async () => {
    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/admin/users/list-users')
    )

    //! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('GET', '/api/admin/users/list-users')
    )

    //! Check main functionality
    test('Should list all users', async () => {
        // Get users from API
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/admin/users/list-users',
            headers: {
                authorization: `Bearer ${process.env.ADMIN_JWT}`
            }
        })
        expect(res.statusCode).toBe(200)
        const listedUsers = res.json()

        // Get users in db
        const dbUsers = await db.select().from(usersTable)

        // Test Condition
        expect(listedUsers.length).toBe(dbUsers.length)
    })
})
