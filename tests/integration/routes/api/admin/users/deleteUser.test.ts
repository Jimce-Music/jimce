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

describe('DELETE /api/admin/users/user', async () => {
    // Get burner user
    const user = await getBurnerUser(false)

    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('DELETE', '/api/admin/users/user', {
            id: uuid.v4()
        })
    )

    //! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('DELETE', '/api/admin/users/user', {
            id: uuid.v4()
        })
    )

    //! Check main functionality
    test('Should delete the user', async () => {
        // Check if burner user exists
        const db_users_before = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.username, user.username))
        expect(db_users_before.length).toBe(1)
        expect(db_users_before[0]?.id).toBeString()

        // Send delete request
        const res = await fastify.inject({
            method: 'DELETE',
            url: '/api/admin/users/user',
            body: {
                id: db_users_before[0]?.id
            },
            headers: {
                authorization: `Bearer ${process.env.ADMIN_JWT}`
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().success).toBeTrue()

        // Now it should be gone
        const db_users_after = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.username, user.username))
        expect(db_users_after.length).toBe(0)
    })
})
