import { expect } from 'bun:test'
import * as z from 'zod'
import fastify from '../../../src/fastify'
import getBurnerUser from '../getBurnerUser'

export type HTTPMethod =
    | 'DELETE'
    | 'delete'
    | 'GET'
    | 'get'
    | 'HEAD'
    | 'head'
    | 'PATCH'
    | 'patch'
    | 'POST'
    | 'post'
    | 'PUT'
    | 'put'
    | 'OPTIONS'
    | 'options'

export default function CT_JWT_checks(
    method: HTTPMethod,
    url: string,
    validBody?: object
) {
    // Will get run by the test(name, callback)
    return async function () {
        // Get burner users
        const user_normal = await getBurnerUser(false)
        const user_admin = await getBurnerUser(true)

        // Normal user should get rejected
        const res_n = await fastify.inject({
            method,
            url,
            headers: {
                authorization: `Bearer ${user_normal.jwt}`
            },
            body: validBody
        })
        expect(res_n.statusCode).toBe(403)

        // Admin should not be rejected
        const res_a = await fastify.inject({
            method,
            url,
            headers: {
                authorization: `Bearer ${user_admin.jwt}`
            },
            body: validBody
        })
        expect(res_a.statusCode).not.toBe(403)
    }
}
