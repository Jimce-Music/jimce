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

// Internal stuff + auth related
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

// Music related
export const songsTable = pgTable('songs', {
    id: uuid().notNull().primaryKey().defaultRandom()
})
