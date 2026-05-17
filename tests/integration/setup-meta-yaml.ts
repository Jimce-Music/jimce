import yaml from 'yaml'
import path from 'path'
import { readFile, writeFile } from 'fs/promises'

const META_PATH = path.resolve(__dirname, '../../meta.yml')
const originalRaw = await readFile(META_PATH, 'utf8')

const meta = yaml.parse(originalRaw)
meta.execution = {
    ...meta.execution,
    is_ci_run: true,
    disable_db: false,
    disable_background_jobs: true,
    server_disable_listening: true
}
await writeFile(META_PATH, yaml.stringify(meta))

export async function resetMetaYAML() {
    await writeFile(META_PATH, originalRaw)
}
