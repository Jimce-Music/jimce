import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, '../..')
const OPENAPI_JSON = path.join(ROOT, 'openapi.json')
const FLUTTER_PACKAGE_ROOT = path.join(ROOT, 'api-clients', 'jimce_api_flutter')
const TEMP_OUTPUT = path.join(FLUTTER_PACKAGE_ROOT, '.openapi-generated')
const TARGET_LIB_DIR = path.join(FLUTTER_PACKAGE_ROOT, 'lib')
const TARGET_SRC_DIR = path.join(TARGET_LIB_DIR, 'src')

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function removeWithRetry(targetPath: string, maxAttempts = 8) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await fs.remove(targetPath)
            return
        } catch (err: any) {
            const isLastAttempt = attempt === maxAttempts
            const isRetriable = err?.code === 'EBUSY' || err?.code === 'EPERM'

            if (!isRetriable || isLastAttempt) {
                throw err
            }

            await sleep(250 * attempt)
        }
    }
}

async function runGenerator() {
    if (!(await fs.pathExists(OPENAPI_JSON))) {
        throw new Error(`OpenAPI schema not found: ${OPENAPI_JSON}`)
    }

    await removeWithRetry(TEMP_OUTPUT)

    const args = [
        '@openapitools/openapi-generator-cli',
        'generate',
        '-g',
        'dart-dio',
        '-i',
        OPENAPI_JSON,
        '-o',
        TEMP_OUTPUT,
        '--additional-properties',
        'pubName=jimce_api_flutter,pubVersion=1.0.0,serializationLibrary=json_serializable'
    ]

    await new Promise<void>((resolve, reject) => {
        const child = spawn('bunx', args, {
            cwd: ROOT,
            stdio: 'inherit',
            shell: process.platform === 'win32'
        })

        child.on('error', reject)
        child.on('exit', (code) => {
            if (code === 0) {
                resolve()
                return
            }
            reject(new Error(`openapi-generator exited with code ${code}`))
        })
    })
}

async function syncOutput() {
    const generatedLibDir = path.join(TEMP_OUTPUT, 'lib')
    const generatedSrcDir = path.join(generatedLibDir, 'src')
    const generatedEntrypoint = path.join(generatedLibDir, 'jimce_api_flutter.dart')

    if (!(await fs.pathExists(generatedLibDir))) {
        throw new Error(`Expected generated Dart sources in: ${generatedLibDir}`)
    }

    if (!(await fs.pathExists(generatedSrcDir))) {
        throw new Error(`Expected generated Dart sources in: ${generatedSrcDir}`)
    }

    if (!(await fs.pathExists(generatedEntrypoint))) {
        throw new Error(`Expected generated entrypoint in: ${generatedEntrypoint}`)
    }

    await fs.ensureDir(TARGET_LIB_DIR)
    await removeWithRetry(path.join(TARGET_SRC_DIR, 'generated')).catch(() => {})
    await fs.emptyDir(TARGET_SRC_DIR)
    await fs.copy(generatedSrcDir, TARGET_SRC_DIR)
    await fs.copy(generatedEntrypoint, path.join(TARGET_LIB_DIR, 'jimce_api_flutter.dart'))

    // Work around a dart-dio generator issue where numeric enum literals are
    // emitted as doubled single-quotes, e.g. n400(''400'').
    const modelDir = path.join(TARGET_SRC_DIR, 'model')
    const modelFiles = await fs.readdir(modelDir)
    for (const fileName of modelFiles) {
        if (!fileName.endsWith('.dart')) {
            continue
        }

        const filePath = path.join(modelDir, fileName)
        const content = await fs.readFile(filePath, 'utf8')
        const normalized = content.replace(/''(\d+)''/g, "'$1'")

        if (normalized !== content) {
            await fs.writeFile(filePath, normalized)
        }
    }

    const defaultApiPath = path.join(TARGET_SRC_DIR, 'api', 'default_api.dart')
    if (await fs.pathExists(defaultApiPath)) {
        const defaultApiContent = await fs.readFile(defaultApiPath, 'utf8')
        const withFileIgnore = defaultApiContent.includes('// ignore_for_file: unused_import')
            ? defaultApiContent
            : defaultApiContent.replace(
                  '//\n// AUTO-GENERATED FILE, DO NOT MODIFY!\n//\n',
                  '//\n// AUTO-GENERATED FILE, DO NOT MODIFY!\n//\n\n// ignore_for_file: unused_import\n'
              )

        const normalizedDefaultApi = withFileIgnore.replace('// ignore: unused_import\n', '')

        if (normalizedDefaultApi !== defaultApiContent) {
            await fs.writeFile(defaultApiPath, normalizedDefaultApi)
        }
    }
}

async function main() {
    await runGenerator()
    await syncOutput()
    await removeWithRetry(TEMP_OUTPUT)

    console.log(`Flutter API client generated in: ${TARGET_LIB_DIR}`)
}

main().catch(async (err) => {
    await removeWithRetry(TEMP_OUTPUT).catch(() => {})
    console.error(err)
    process.exit(1)
})
