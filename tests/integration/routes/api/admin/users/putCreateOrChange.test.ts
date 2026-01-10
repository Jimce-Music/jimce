import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../components/CT_JWT_checks'
import getBurnerUser from '../../../../getBurnerUser'
import CT_ADMIN_checks from '../../../../components/CT_ADMIN_checks'
import * as uuid from 'uuid'

describe('PUT /api/admin/users/create-or-change', async () => {
    // Get burner user
    const user = await getBurnerUser(false)

    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('PUT', '/api/admin/users/create-or-change', {
            username: uuid.v4(),
            password: uuid.v4(),
            email: null,
            isAdmin: false
        })
    )

    //! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('PUT', '/api/admin/users/create-or-change', {
            username: uuid.v4(),
            password: uuid.v4(),
            email: null,
            isAdmin: false
        })
    )

    //! Check main functionality
    test('Should update (change) burner user data', async () => {
        const newPassword = uuid.v7()

        const r1 = await fastify.inject({
            method: 'PUT',
            url: '/api/admin/users/create-or-change',
            body: {
                username: user.username,
                password: newPassword,
                email: 'newEmail@example.com',
                isAdmin: true
            },
            headers: {
                authorization: `Bearer ${process.env.ADMIN_JWT}`
            }
        })
        expect(r1.statusCode).toBe(200)
        expect(r1.json().success).toBeTrue()

        // Check if new user logs in with new password
        const r2 = await fastify.inject({
            method: 'POST',
            url: '/api/auth/login-basic',
            body: {
                username: user.username,
                password: newPassword
            }
        })
        expect(r2.statusCode).toBe(200)
        expect(r2.json().token).toBeString()

        // Check if new user data matches (admin and new email address)
        const r3 = await fastify.inject({
            method: 'GET',
            url: '/api/me/userinfo',
            headers: {
                authorization: `Bearer ${r2.json().token}`
            }
        })
        expect(r3.statusCode).toBe(200)
        expect(r3.json().email).toBe('newEmail@example.com')
        expect(r3.json().isAdmin).toBeTrue()
    })

    test('Should create a new user', async () => {
        const username = uuid.v7()
        const password = uuid.v7()

        // Create user
        const r1 = await fastify.inject({
            method: 'PUT',
            url: '/api/admin/users/create-or-change',
            body: {
                username,
                password,
                email: null,
                isAdmin: false
            },
            headers: {
                authorization: `Bearer ${process.env.ADMIN_JWT}`
            }
        })
        expect(r1.statusCode).toBe(200)
        expect(r1.json().success).toBeTrue()

        // Try to login as new user
        const r2 = await fastify.inject({
            method: 'POST',
            url: '/api/auth/login-basic',
            body: {
                username,
                password
            }
        })
        expect(r2.statusCode).toBe(200)
        expect(r2.json().token).toBeString()
    })
})
