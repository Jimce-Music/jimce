import fastify from '../../src/fastify'
import * as z from 'zod'
import type { $DefaultResponse } from '../../src/routes/api/auth/postLogin-basic'
import logger from '../../src/logger'

// Utility for saving the central admin jwt for ci runs
const admin_login_res = await fastify.inject({
    method: 'post',
    url: '/api/auth/login-basic',
    body: {
        username: 'admin',
        password: '123456789abc'
    }
})
const admin_login_data =
    admin_login_res.json<z.infer<typeof $DefaultResponse>>()
export const ADMIN_JWT = admin_login_data.token
