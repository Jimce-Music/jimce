import { afterAll, beforeAll } from 'bun:test'

import path from 'path'
import yaml from 'yaml'
import { readFile, writeFile } from 'fs/promises'

import { migrateDB } from '../../src/db'
import ensureAdminUsers from '../../src/jobs/ensureAdminUser'
import { sleep } from 'bun'
import fastify from '../../src/fastify'

const META_PATH = path.resolve(__dirname, '../../meta.yml')
const CWD = path.resolve(__dirname, '../..')

const originalRaw = await readFile(META_PATH, 'utf8')

beforeAll(async () => {
    // Initialize the test run

    // 1. Change meta.yml to configure the environment for tests
    const meta = yaml.parse(originalRaw)
    meta.execution = {
        ...meta.execution,
        is_ci_run: true,
        disable_db: false,
        disable_background_jobs: true,
        server_disable_listening: true
    }
    await writeFile(META_PATH, yaml.stringify(meta))

    // 2. Start test db (no need to reset, as no volume is used)
    const db_spawn_proc = Bun.spawn([
        'docker',
        'compose',
        '-f',
        'compose-test-db.yml',
        'up',
        '-d'
    ])
    const db_spawn_exitCode = await db_spawn_proc.exited
    if (db_spawn_exitCode !== 0) {
        console.error(
            'Database could not be spawned, please try to run the compose file manually. Exiting'
        )
        process.exit(1)
    }
    // Wait 2 seconds for db to load
    await sleep(2_000)

    // 3. Run DB migrations
    await migrateDB()

    // 4. Necessary background jobs
    // 4.1. Ensure admin user
    await ensureAdminUsers()
})

afterAll(async () => {
    // Finalize the test run and restore old state

    // 1. Reset meta.yml
    await writeFile(META_PATH, originalRaw)

    // 2. Close fastify server
    await fastify.close()

    // 3. Stop test db
    const db_kill_proc = Bun.spawn([
        'docker',
        'compose',
        '-f',
        'compose-test-db.yml',
        'down'
    ])
    await db_kill_proc.exited
})
