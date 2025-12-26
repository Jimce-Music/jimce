import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: 'openapi.json',
    output: 'api-clients/typescript-api-client/src/client',
    plugins: ['@hey-api/client-fetch']
})
