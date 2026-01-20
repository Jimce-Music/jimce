// Integration test for GET /api/ping

import { expect, test, describe } from 'bun:test'
import fastify from '../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../tests/integration/components/CT_JWT_checks'
import getBurnerUser from '../../../../tests/integration/getBurnerUser'
import CT_ADMIN_checks from '../../../../tests/integration/components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '../../../../src/db'
import { usersTable } from '../../../../src/db/schema'
import { eq } from 'drizzle-orm'

describe('GET /api/ping', async () => {
    //! Check main functionality
    test('Expect pong return', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/ping'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toBe('pong')
    })
})
