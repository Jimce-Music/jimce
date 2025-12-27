import { timestamp } from 'drizzle-orm/gel-core'
import {
    integer,
    pgTable,
    uniqueIndex,
    uuid,
    varchar,
    text,
    serial,
    boolean
} from 'drizzle-orm/pg-core'

export const testTable = pgTable('test', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull()
})

export const usersTable = pgTable(
    'users',
    {
        id: uuid().notNull().primaryKey().defaultRandom(),
        username: text().notNull(),
        email: text(),
        pwHash: text(),
        isAdmin: boolean().notNull().default(false)
    },
    (table) => [uniqueIndex('username_idx').on(table.username)] // username as secondary index
)
