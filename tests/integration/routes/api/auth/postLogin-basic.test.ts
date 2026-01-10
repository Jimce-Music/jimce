import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import { $DefaultResponse } from '../../../../../src/routes/api/auth/postLogin-basic'
import * as z from 'zod'

describe('POST /api/auth/login-basic', () => {
    test('Generate a JWT with valid default admin credentials', async () => {
        const res = await fastify.inject({
            method: 'post',
            url: '/api/auth/login-basic',
            body: {
                username: 'admin',
                password: '123456789abc'
            }
        })

        // Status code
        expect(res.statusCode).toBe(200)

        // Token must exist

        const data = res.json<z.infer<typeof $DefaultResponse>>()
        expect(data.token).toBeString()
        expect(data.token).toSatisfy((val) => val.length > 8)
    })

    test('Fail on wrong username', async () => {
        const res = await fastify.inject({
            method: 'post',
            url: '/api/auth/login-basic',
            body: {
                username: 'not.a.existing.user',
                password: '123456789abc'
            }
        })

        // Status code
        expect(res.statusCode).toBe(401)
    })

    test('Fail on wrong password', async () => {
        const res = await fastify.inject({
            method: 'post',
            url: '/api/auth/login-basic',
            body: {
                username: 'admin',
                password: 'definitely-the-wrong-password'
            }
        })

        // Status code
        expect(res.statusCode).toBe(401)
    })
})

// TODO: Implement test components which can be reused for routes, like checking whether auth and permissions are ensured, and data is validated
// TODO: Auto-apply component tests on route/code generation
