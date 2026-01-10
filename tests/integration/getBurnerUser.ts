/*
    This file is used in the test to generate a new "burner" user, with a new, unique username, password and freshly generated JWT, so that changes can be made to the user without worrying.
    It will be destroyed later on.
*/

import * as uuid from 'uuid'

export interface UserData {
    username: string
    password: string

    jwt: string

    destroy(): Promise<void>
}

export default async function getBurnerUser(): UserData {
    // Generate user data
    const userdata = {
        username: uuid.v7(),
        password: uuid.v7()
    }

    // Request token

    // Add destroy method to delete user

    return userdata
}
