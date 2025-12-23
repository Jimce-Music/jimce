import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'

const client = new SQL()

const db = drizzle({ client })

export default db
