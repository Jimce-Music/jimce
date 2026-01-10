import { expect, test, describe } from 'bun:test'
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
        // Get burner user
        const user = await getBurnerUser(true)
        // Check if invalid tokens are rejected
        // Invalid header
        let res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'INVALID_HEADER'
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        // No authorization header
        res = await fastify.inject({
            method,
            url,
            headers: {},
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        // Empty authorization header
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: ''
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        // Bearer header no token
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer'
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer '
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        // Malformed token
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer <malformed_token>'
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)
        // Token with invalid secret and incorrect data
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
            },
            body: validBody
        })
        expect(res.statusCode).toBe(401)

        // Check if valid token is not rejected
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: `Bearer ${user.jwt}`
            },
            body: validBody
        })
        expect(res.statusCode).toBe(200)
    }
}
