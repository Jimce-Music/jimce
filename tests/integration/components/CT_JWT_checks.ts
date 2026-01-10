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

export default function CT_JWT_checks(method: HTTPMethod, url: string) {
    // Will get run by the test(name, callback)
    return async function () {
        // Get burner user
        const user = await getBurnerUser()
        // Check if invalid tokens are rejected
        // Invalid header
        let res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'INVALID_HEADER'
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        // No authorization header
        res = await fastify.inject({
            method,
            url,
            headers: {}
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        // Empty authorization header
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: ''
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        // Bearer header no token
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer'
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer '
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        // Malformed token
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: 'Bearer <malformed_token>'
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])
        // Token with invalid secret and incorrect data
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
            }
        })
        expect(res.statusCode).toBeOneOf([401, 500, 400])

        // Check if valid token is not rejected
        res = await fastify.inject({
            method,
            url,
            headers: {
                authorization: `Bearer ${user.jwt}`
            }
        })
        expect(res.statusCode).not.toBeOneOf([401])
    }
}
