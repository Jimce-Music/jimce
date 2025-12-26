import { readFile, writeFile } from 'fs/promises'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const META_PATH = path.resolve(__dirname, '../../meta.yml')
const CWD = path.resolve(__dirname, '../..')
const EXECUTION_TIME = 5000

async function main() {
    const originalRaw = await readFile(META_PATH, 'utf8')
    // console.log(originalRaw)
    const meta = yaml.parse(originalRaw)

    meta.execution = {
        ...meta.execution,
        is_ci_run: true,
        disable_db: true,
        disable_background_jobs: true
    }

    await writeFile(META_PATH, yaml.stringify(meta))

    const child = spawn('bun', ['run', 'src/index.ts'], {
        cwd: CWD,
        stdio: 'inherit'
    })
    child.on('exit', async () => {
        await writeFile(META_PATH, originalRaw)
    })

    await new Promise((resolve) => setTimeout(resolve, EXECUTION_TIME))

    child.kill('SIGTERM')

    await new Promise((resolve) => {
        child.on('exit', resolve)
    })

    await writeFile(META_PATH, originalRaw)
}

main().catch(async (err) => {
    try {
        const originalRaw = await readFile(META_PATH + '.bak', 'utf8')
        await writeFile(META_PATH, originalRaw)
    } catch {}
    throw err
})
