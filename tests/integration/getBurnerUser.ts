/*
    This file is used in the test to generate a new "burner" user, with a new, unique username, password and freshly generated JWT, so that changes can be made to the user without worrying.
*/

import * as uuid from 'uuid'
import type { $DefaultResponse } from '../../src/routes/api/auth/postLogin-basic'
import fastify from '../../src/fastify'
import * as z from 'zod'

export interface UserData {
    username: string
    password: string

    jwt: string
}

export default async function getBurnerUser(
    isAdmin: boolean = false
): Promise<UserData> {
    // Generate user data
    const user_credentials = {
        username: uuid.v7(),
        password: uuid.v7()
    }

    // Create user
    await fastify.inject({
        method: 'PUT',
        url: '/api/admin/users/create-or-change',
        body: {
            username: user_credentials.username,
            password: user_credentials.password,
            email: null,
            isAdmin
        },
        headers: {
            authorization: `Bearer ${process.env.ADMIN_JWT}`
        }
    })

    // Request token
    const burner_login_res = await fastify.inject({
        method: 'post',
        url: '/api/auth/login-basic',
        body: {
            username: user_credentials.username,
            password: user_credentials.password
        }
    })
    const burner_login_data =
        burner_login_res.json<z.infer<typeof $DefaultResponse>>()
    const burner_jwt = burner_login_data.token

    // Create userdata
    const userdata: UserData = {
        username: user_credentials.username,
        password: user_credentials.password,
        jwt: burner_jwt
    }

    return userdata
}
