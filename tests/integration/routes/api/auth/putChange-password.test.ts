import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../components/CT_JWT_checks'

describe('PUT /api/auth/change-password', () => {
    // Check for auth
    test('Authentication works fine', CT_JWT_checks(fastify))
})
