// Integration test for GET /api/asset/:assetuuid

import { expect, test, describe } from 'bun:test'
import fastify from '../../../../../src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '../../../../../tests/integration/components/CT_JWT_checks'
import getBurnerUser from '../../../../../tests/integration/getBurnerUser'
import CT_ADMIN_checks from '../../../../../tests/integration/components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '../../../../../src/db'
import { assetsTable, usersTable } from '../../../../../src/db/schema'
import { eq } from 'drizzle-orm'
import logger from '../../../../../src/logger'

describe('GET /api/asset/:assetuuid', async () => {
    //! Check for auth
    test('Authentication works fine', async () => {
        const existingAsset = (await db.select().from(assetsTable).limit(1))[0]

        if (!existingAsset) {
            logger.error(
                'Cannot test get[assetuuid], as no assets are registered in the db'
            )
            expect(1).toBe(2)
        } else {
            return await CT_JWT_checks(
                'GET',
                `/api/asset/${existingAsset.id}`
            )()
        }
    })

    //! 404
    test('Shows 404 on non-existing assets', async () => {
        const user = await getBurnerUser(false)

        const res = await fastify.inject({
            method: 'GET',
            url: '/api/asset/asset-that-will-never-exist',
            headers: {
                authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
            }
        })
        expect(res.statusCode).toBe(404)
    })

    //! Check main functionality
    test('Loads an existing asset successfully and supports range headers', async () => {
        const user = await getBurnerUser(false)

        const existingAsset = (await db.select().from(assetsTable).limit(1))[0]

        if (!existingAsset) {
            logger.error(
                'Cannot test get[assetuuid], as no assets are registered in the db'
            )
            expect(1).toBe(2)
        } else {
            const res = await fastify.inject({
                method: 'GET',
                url: `/api/asset/${existingAsset.id}`,
                headers: {
                    authorization: `Bearer ${user.jwt}` // or: ADMIN_JWT
                }
            })
            expect(res.statusCode).toBe(200)
            expect(res.headers['accept-ranges']).toBe('bytes')
            expect(res.headers['content-type']).toBe(existingAsset.mimeType)
            expect(
                typeof res.headers['content-length'] === 'number'
                    ? res.headers['content-length']
                    : parseInt(res.headers['content-length'] ?? '0')
            ).toBeGreaterThan(30) // min: 30 bytes
        }
    })
})
