import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../components/CT_JWT_checks'
import getBurnerUser from '../../../../getBurnerUser'
import CT_ADMIN_checks from '../../../../components/CT_ADMIN_checks'

describe('PUT /api/admin/users/create-or-change', async () => {
    // Get burner user
    const user = await getBurnerUser()

    //! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('PUT', '/api/admin/users/create-or-change')
    )

    //! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('PUT', '/api/admin/users/create-or-change', {
            username: 'some.user',
            email: null,
            isAdmin: false
        })
    )

    //! Check main functionality
    // TODO: Implement this
})
