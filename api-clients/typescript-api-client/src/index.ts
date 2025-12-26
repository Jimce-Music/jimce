export * from './client'
import { client } from './client/client.gen'

export { client }
export const setConfig = client.setConfig
