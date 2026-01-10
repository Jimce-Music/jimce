import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../components/CT_JWT_checks'
import getBurnerUser from '../../../getBurnerUser'
import * as uuid from 'uuid'

describe('PUT /api/auth/change-password', async () => {
    // Get burner user
    const user = await getBurnerUser()

    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('PUT', '/api/auth/change-password', {
            newPassword: uuid.v7()
        })
    )

    //! Check main functionality
    // Check if login with old password works
    test('Login with old password', async () => {
        const res = await fastify.inject({
            method: 'POST',
            url: '/api/auth/login-basic',
            body: {
                username: user.username,
                password: user.password
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().token).toBeString()
    })

    // Change password
    const newPassword = 'NEW_PASSWORD_FOR_USER111!'
    test('Password change should work', async () => {
        const res = await fastify.inject({
            method: 'PUT',
            url: '/api/auth/change-password',
            body: {
                newPassword: newPassword
            },
            headers: {
                authorization: `Bearer ${user.jwt}`
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().success).toBeTrue()
    })

    // Login with old password should not work anymore
    test('Login with old password', async () => {
        const res = await fastify.inject({
            method: 'POST',
            url: '/api/auth/login-basic',
            body: {
                username: user.username,
                password: user.password
            }
        })
        expect(res.statusCode).not.toBe(200)
    })
    // Login with new password should work
    test('Login with old password', async () => {
        const res = await fastify.inject({
            method: 'POST',
            url: '/api/auth/login-basic',
            body: {
                username: user.username,
                password: newPassword
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.json().token).toBeString()
    })
})
