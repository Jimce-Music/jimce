import {
    pgTable,
    uniqueIndex,
    uuid,
    text,
    boolean,
    index,
    varchar,
    char,
    date,
    integer
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

// File system / Bucket store
export const assetsTable = pgTable('assets', {
    id: uuid().notNull().primaryKey().defaultRandom(),
    /**
     * Does not include the file extension
     */
    filename: text().notNull(),
    /**
     * Prefixed with a dot, e.g. ".mp3"
     */
    fileExtension: varchar({
        length: 10
    }).notNull(),

    mimeType: varchar({
        length: 128
    }).notNull(),

    creationDate: date().notNull().defaultNow()

    // No need to store path, as path will always be UUID[:2]/UUID --> e.g.: 00/00abc8j[...]
})

// Music related
export const songsTable = pgTable(
    'songs',
    {
        id: uuid().notNull().primaryKey().defaultRandom(),
        name: text().notNull(),
        // This is not a DB-enforced foreign-key array, but it is expected to contain artist IDs from artistsTable.
        artistIds: uuid().notNull().array(),

        downloaded: boolean().notNull().default(false),

        downloadDate: date(),
        firstRecognizedDate: date().notNull().defaultNow(),
        lastPlayedByAnyoneDate: date(),

        soundDefault: uuid().references(() => assetsTable.id),

        mbid: char({
            length: 36
        }),
        ytid: varchar({
            length: 16
        }),

        // Images
        coverImage: uuid().references(() => assetsTable.id),
        coverImagePreview: uuid().references(() => assetsTable.id)
    },
    (table) => [
        index('songs_ytid_idx').on(table.ytid),
        index('songs_mbid_idx').on(table.mbid),
        index('songs_name_idx').on(table.name)
    ]
)

export const artistsTable = pgTable(
    'artists',
    {
        id: uuid().notNull().primaryKey().defaultRandom(),
        name: text().notNull().unique(),
        description: text(),

        profilePicture: uuid().references(() => assetsTable.id),
        backgroundPicture: uuid().references(() => assetsTable.id),

        // additional data to identify artists
        mbid: char({
            length: 36
        }),
        deezerId: integer(),
        spotifyId: varchar({
            length: 255
        })
    },
    (table) => [
        uniqueIndex('artists_name_idx').on(table.name),
        index('artists_deezer_id_idx').on(table.deezerId),
        index('artists_spotify_id_idx').on(table.spotifyId),
        index('artists_mbid_idx').on(table.mbid)
    ]
)
