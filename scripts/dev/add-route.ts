import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs/promises'
import fse from 'fs-extra'
import path from 'path'

const SRC_PATH = path.join(__dirname, '..', '..', 'src')
const ROUTES_PATH = path.join(SRC_PATH, 'routes')
const ROUTES_TEST_PATH = path.join(
    SRC_PATH,
    '..',
    'tests',
    'integration',
    'routes'
)
const ALL_ROUTES_PATH = path.join(ROUTES_PATH, 'all.ts')

console.log(
    chalk.blue('This script will create a new route, based on your inputs.')
)

function transformRouteName(value: string) {
    if (value.startsWith('/')) value = value.substring(1)
    if (value.endsWith('/')) value = value.substring(0, value.length - 1)
    return value
}

// Main
async function main(): Promise<void> {
    // Prompts
    const answers = await inquirer.prompt<{
        isAPI: boolean
        isOpenAPI: boolean
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
        path: string
        package: string
        requiresAuth: boolean
    }>([
        {
            type: 'confirm',
            name: 'isAPI',
            default: true,
            message: 'Is this an API route?'
        },
        {
            type: 'confirm',
            name: 'isOpenAPI',
            default: true,
            message: 'Should this route appear in the OpenAPI spec?'
        },
        {
            type: 'input',
            name: 'package',
            message:
                'What package should this route belong to? (e.g. "admin"; don\'t include "api", nested packages via slash: "admin/users")',
            default: ''
        },
        {
            type: 'rawlist',
            name: 'method',
            message: 'What HTTP method should the route use?',
            choices: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            default: 'GET'
        },
        {
            type: 'input',
            name: 'path',
            message:
                "Please enter the route path (parameters are allowed, don't include the package name)",
            validate: (value: string) => {
                return value.length > 0
                    ? true
                    : 'Route path may not be empty, try again'
            }
        },
        {
            type: 'confirm',
            name: 'requiresAuth',
            default: true,
            message: 'Should the route require auth?'
        }
    ])

    let adminExclusive: boolean = false
    if (answers.requiresAuth) {
        const adminExclusiveAnswer = await inquirer.prompt<{
            adminExclusive: boolean
        }>([
            {
                type: 'confirm',
                name: 'adminExclusive',
                message: 'Should the route require admin permissions?',
                default: false
            }
        ])

        adminExclusive = adminExclusiveAnswer.adminExclusive
    }

    answers.path = transformRouteName(answers.path)

    const PACKAGE_PATH = path.join(
        ROUTES_PATH,
        answers.isAPI ? 'api' : '',
        answers.package
    )
    const PACKAGE_TEST_PATH = path.join(
        ROUTES_TEST_PATH,
        answers.isAPI ? 'api' : '',
        answers.package
    )

    let ROUTE_NAME = answers.path // Example input: example/:userid-:token/Sol/some-bs(^&/%\\:)/*        OR        users/:id/add
        .replace(/:([\w]*?)([^\w]|$)/g, '[$1]$2') // /:id --> /[id]
        .replace(/(\*)/g, '[any]') // /* --> /[any]
        .replace(/\/(.)/g, (str: string, firstChar: string): string => {
            return firstChar.toUpperCase()
        }) // Capitalize after slash (a/bee --> aBee)
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_') // Replace characters not allowed in filenames
    // Capitalize first character
    ROUTE_NAME = ROUTE_NAME.replace(/^(.)/g, (_, gr_1) => {
        return gr_1.toUpperCase()
    })
    // console.log(ROUTE_NAME)

    const ROUTE_FILE_PATH = path.join(
        PACKAGE_PATH,
        `${answers.method.toLowerCase()}${ROUTE_NAME}.ts`
    )
    const TEST_FILE_PATH = path.join(
        PACKAGE_TEST_PATH,
        `${answers.method.toLowerCase()}${ROUTE_NAME}.test.ts`
    )

    // Create route file
    let dotDotCountUntilSrcDir = 1
    if (answers.isAPI) dotDotCountUntilSrcDir += 1
    if (answers.package.length > 0) {
        dotDotCountUntilSrcDir += answers.package.split('/').length
    }
    const srcDirRelativePath = `${'../'.repeat(dotDotCountUntilSrcDir) === '' ? './' : '../'.repeat(dotDotCountUntilSrcDir)}`
    const rootDirRelativePathToTests = srcDirRelativePath + '../../'

    let template = await fs.readFile(
        path.join(__dirname, 'route.ts.template'),
        'utf-8'
    )
    template = template.replaceAll('$SRC$', srcDirRelativePath)
    template = template.replaceAll(
        '$PATH$',
        `/${answers.isAPI ? 'api/' : ''}${answers.package ? answers.package + '/' : ''}${answers.path}`
    )
    template = template.replaceAll('$NAME$', ROUTE_NAME)
    template = template.replaceAll('$METHOD$', answers.method)
    template = template.replaceAll(
        '$METHOD_LOWERCASE$',
        answers.method.toLowerCase()
    )
    template = template.replaceAll('$HIDE$', (!answers.isOpenAPI).toString())
    template = template.replaceAll(
        '$OPTIONAL_BODY$',
        answers.method !== 'GET'
            ? `body: z.object({
                /*dataField: z.string().meta({
                    description: 'Just some data field',
                    example: '32168'
                })*/
            }),
`
            : ''
    )

    if (answers.requiresAuth) {
        template = template.replaceAll(
            '$AUTH_1$',
            'onRequest: [fastify.authenticate], // Secures route with JWT\n'
        )
        template = template.replaceAll('$AUTH_2$', 'security: requireJWT,')
        template = template.replaceAll(
            '$AUTH_3$',
            `let user: z.infer<typeof JWTPayloadZ>
                    try {
                        user = JWTPayloadZ.parse(req.user)
                    } catch (err) {
                        logger.error('Error during JWT payload parsing via zod:')
                        logger.error(err)
                        return res.status(401).send({
                            statusCode: 401,
                            error: 'Unauthorized',
                            message: 'Failed to parse token payload',
                            code: 'TOKEN_PAYLOAD_INVALID'
                        })
                    }`
        )
    } else {
        template = template.replace(/\$(AUTH)_[0-9]\$/g, '')
    }

    if (adminExclusive) {
        template = template.replaceAll(
            '$ADMIN_0$',
            `import ForbiddenResponseZ from '${srcDirRelativePath}types/ForbiddenResponseZ'`
        )
        template = template.replaceAll('$ADMIN_1$', '403: ForbiddenResponseZ,')
        template = template.replaceAll(
            '$ADMIN_2$',
            `if (!req.isAdmin) {
                return res.status(403).send({
                    statusCode: 403,
                    code: 'NOT_AN_ADMIN',
                    error: 'Forbidden',
                    message: 'You need admin rights to access this route'
                })
            }`
        )
    } else {
        template = template.replace(/\$(ADMIN)_[0-9]\$/g, '')
    }

    await fse.ensureFile(ROUTE_FILE_PATH)
    await fs.writeFile(ROUTE_FILE_PATH, template, 'utf-8')

    // Import route in all.ts
    const IMPORTER_COMMENT = `// --${answers.isAPI ? 'api-' : ''}${answers.package}--§NEW_HERE§--`
    let IMPORTER_FILE = await fs.readFile(ALL_ROUTES_PATH, 'utf-8')

    if (IMPORTER_FILE.includes(IMPORTER_COMMENT)) {
        // Just append import line at comment
        IMPORTER_FILE = IMPORTER_FILE.replace(
            IMPORTER_COMMENT,
            `import './${path.join(
                answers.isAPI ? 'api' : '',
                answers.package,
                `${answers.method.toLowerCase()}${ROUTE_NAME}.ts`
            )}' // ${answers.method} /${answers.isAPI ? 'api/' : ''}${answers.package ? answers.package + '/' : ''}${answers.path}\n${IMPORTER_COMMENT}`
        )
        await fs.writeFile(ALL_ROUTES_PATH, IMPORTER_FILE, 'utf-8')
    } else {
        // Manually find correct comment position and add comment
        let block = answers.isAPI ? 'API' : 'General'
        let end_block = `// END ${block}`

        // Add package Importe Comment
        IMPORTER_FILE = IMPORTER_FILE.replace(
            end_block,
            `
// Package: ${answers.package}
${IMPORTER_COMMENT}
${end_block}`
        )

        // Logic copied from above
        IMPORTER_FILE = IMPORTER_FILE.replace(
            IMPORTER_COMMENT,
            `import './${path.join(
                answers.isAPI ? 'api' : '',
                answers.package,
                `${answers.method.toLowerCase()}${ROUTE_NAME}.ts`
            )}' // ${answers.method} /${answers.isAPI ? 'api/' : ''}${answers.package ? answers.package + '/' : ''}${answers.path}\n${IMPORTER_COMMENT}`
        )
        await fs.writeFile(ALL_ROUTES_PATH, IMPORTER_FILE, 'utf-8')
    }

    //! Create test file
    const FULL_API_URL = `/${answers.isAPI ? 'api/' : ''}${answers.package ? answers.package + '/' : ''}${answers.path}`
    await fs.writeFile(
        TEST_FILE_PATH,
        `// Integration test for ${answers.method.toUpperCase()} ${FULL_API_URL}

import { expect, test, describe } from 'bun:test'
import fastify from '${rootDirRelativePathToTests}src/fastify'
import * as z from 'zod'
import CT_JWT_checks from '${rootDirRelativePathToTests}tests/integration/components/CT_JWT_checks'
import getBurnerUser from ${rootDirRelativePathToTests}tests/integration/getBurnerUser'
import CT_ADMIN_checks from '${rootDirRelativePathToTests}tests/integration/components/CT_ADMIN_checks'
import * as uuid from 'uuid'
import db from '${rootDirRelativePathToTests}src/db'
import { usersTable } from '${rootDirRelativePathToTests}src/db/schema'
import { eq } from 'drizzle-orm'

describe('${answers.method.toUpperCase()} ${FULL_API_URL}', async () => {
    ${
        answers.requiresAuth
            ? `//! Check for auth
    test(
        'Authentication works fine',
        CT_JWT_checks('GET', '/api/admin/users/list-users') // TODO: Add valid body if required by the endpoint
    )`
            : ''
    }

    ${
        adminExclusive
            ? `//! Check admin permissions
    test(
        'Admin permissions required',
        CT_ADMIN_checks('GET', '/api/admin/users/list-users') // TODO: Add valid body if required by the endpoint
    )`
            : ''
    }

    //! Check main functionality
    test('Main functionality', async () => { // TODO: Add a descriptive title
        const user = await getBurnerUser(false)

        // TODO: Test core functionality
        
        const res = await fastify.inject({
            method: '${answers.method.toUpperCase()}',
            url: '${FULL_API_URL}',
            headers: {
                authorization: \`Bearer \${user.jwt}\` // or: process.env.ADMIN_JWT
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
`,
        'utf-8'
    )
}

// Execution and error handling
try {
    await main()
} catch (err) {
    console.error(err)
    console.log(chalk.red('Something went wrong, please see the error above!'))
    process.exit(1)
} finally {
    console.log(chalk.green('All done!'))
    process.exit(0)
}
