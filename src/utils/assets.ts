import path from 'path'
import db from '../db'
import { assetsTable } from '../db/schema'
import mime from 'mime'
import fsExtra from 'fs-extra/esm'
import { eq } from 'drizzle-orm'
import logger from '../logger'

export async function buildAssetURIFromUUID(uuid: string): Promise<string> {
    // TODO: implement, for now just dummy
    return `dummy-asset-uri(${uuid})`
}

export function getAssetPath(assetId: string) {
    return path.join(process.cwd(), assetId.slice(0, 2), assetId)
}

export class Asset {
    id: string
    filename: string | undefined
    fileExtension: string | undefined
    creationDate: Date | undefined
    mimeType: string | undefined
    #wasFetched: boolean = false

    constructor(id: string) {
        this.id = id
    }

    wasFetched() {
        return this.#wasFetched
    }

    /**
     * Builds a client available URI without fetching
     */
    buildURI() {
        return `/api/asset/${this.id} `
    }

    /**
     * Builds a client URI with the filename and extension attached
     */
    async buildPrettyURI() {
        if (!this.wasFetched()) await this.fetch()

        return `${this.buildURI()}/${this.filename}${this.fileExtension}`
    }

    /**
     * Fetches metadata for the asset, only required for some functions
     */
    async fetch() {
        const results = await db
            .select()
            .from(assetsTable)
            .where(eq(assetsTable.id, this.id ?? 'unknown-id'))

        const result = results[0]

        if (result) {
            this.#setData({
                creationDate: new Date(result.creationDate),
                fileExtension: result.fileExtension,
                filename: result.filename,
                mimeType: result.mimeType
            })
        } else {
            logger.warn(`Unable to fetch asset ${this.id}`)
        }
    }

    async existsInFs() {
        return await fsExtra.pathExists(this.getPath())
    }

    /**
     * @returns Path of the asset in the server's fs
     */
    getPath() {
        return getAssetPath(this.id)
    }

    /**
     * Internal function to set fetched asset data
     */
    #setData(data: {
        filename: string
        fileExtension: string
        creationDate: Date
        mimeType: string
    }) {
        this.filename = data.filename
        this.fileExtension = data.fileExtension
        this.creationDate = data.creationDate
        this.mimeType = data.mimeType

        this.#wasFetched = true
    }

    /**
     * Creates a new asset in the database and returns an Asset object
     * @param filename full filename for the asset with extension, for example "imagename.jpg"
     */
    static async create(filename: string, mimeType?: string): Promise<Asset> {
        const extname = path.extname(filename)
        const basename = path.basename(filename, extname)
        const now = new Date()
        const identifiedMimeType =
            mimeType ?? // user-specified
            mime.getType(extname) ?? // auto-identified by extension
            'application/octet-stream' // fallback: unknown binary data

        const newDbEntries = await db
            .insert(assetsTable)
            .values({
                filename: basename,
                fileExtension: extname,
                creationDate: now.toISOString(),
                mimeType: identifiedMimeType
            })
            .returning()

        function _failThrow(): string {
            throw `Creation of asset ${basename}${extname} failed: id is not a string`
        }

        const id: string = newDbEntries[0]?.id ?? _failThrow()

        const asset = new Asset(id)

        asset.#setData({
            filename: basename,
            fileExtension: extname,
            creationDate: now,
            mimeType: identifiedMimeType
        })

        return asset
    }
}
