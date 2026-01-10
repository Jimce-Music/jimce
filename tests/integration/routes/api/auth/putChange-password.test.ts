import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../components/CT_JWT_checks'
import getBurnerUser from '../../../getBurnerUser'

describe('PUT /api/auth/change-password', () => {
    // // Get burner user
    // const user = await getBurnerUser()

    // Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('PUT', '/api/auth/change-password')
    )
})
