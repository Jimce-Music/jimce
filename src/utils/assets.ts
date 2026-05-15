import path from 'path'
import db from '../db'
import { assetsTable } from '../db/schema'
import mime from 'mime'
import fsExtra from 'fs-extra/esm'
import { eq } from 'drizzle-orm'
import logger from '../logger'
import { v4 } from 'uuid'
import { createWriteStream } from 'fs'
import { Readable } from 'stream'

export function buildAssetURIFromUUID(uuid: string): string {
    const asset = new Asset(uuid)
    return asset.buildURI()
}

export function getAssetPath(assetId: string) {
    return path.join(process.cwd(), 'assets', assetId.slice(0, 2), assetId)
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
        return `/api/asset/${this.id}`
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
        return await fsExtra.pathExists(await this.getPath())
    }

    /**
     * @returns Path of the asset in the server's fs
     */
    async getPath() {
        await fsExtra.ensureDir(
            path.join(process.cwd(), 'assets', this.id.slice(0, 2))
        )
        return getAssetPath(this.id)
    }

    /**
     * @returns Path of the asset relative to the server's fs assets dir
     */
    async getRelativePath() {
        await fsExtra.ensureDir(
            path.join(process.cwd(), 'assets', this.id.slice(0, 2))
        )
        return path.join(this.id.slice(0, 2), this.id)
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
     * Deletes an asset from the fs and database
     */
    async delete() {
        const file = await this.getPath()

        await fsExtra.remove(file)
        await db.delete(assetsTable).where(eq(assetsTable.id, this.id))
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

    /**
     * Downloads an asset from an URL and saves it. Returns the asset directly, calls callback when done
     * @param url Url to asset
     */
    static fromURL(url: string, doneCallback: (success: boolean) => void) {
        return new Promise<Asset>(async (resolve, reject) => {
            const res = await fetch(url)
            if (!res.ok) {
                logger.warn(
                    `Aborting asset download of ${url}: HTTP ${res.status}`
                )
                reject(`Aborting asset download of ${url}: HTTP ${res.status}`)
            }

            function warnOctetStream() {
                logger.warn(
                    `Unable to identify mime-type based on header for ${url}. Falling back to 'application/octet-stream'`
                )
                return 'application/octet-stream'
            }

            const mimeType =
                res.headers.get('content-type') ??
                res.headers.get('Content-Type') ??
                warnOctetStream()

            const asset = await Asset.create(v4(), mimeType)
            resolve(asset)

            // Now start actual download
            const fPath = await asset.getPath()
            const fStream = createWriteStream(fPath)

            if (res.body) {
                Readable.fromWeb(res.body)
                    .pipe(fStream)
                    .on('finish', () => {
                        doneCallback(true)
                    })
                    .on('error', async (err) => {
                        logger.error(
                            `Error while downloading asset from ${url}: failed to pipe body (error event) into ${fPath}`
                        )
                        logger.error(err)
                        await asset.delete()
                        reject(err)
                        doneCallback(false)
                    })
            } else {
                const err = `Error while downloading asset from ${url}: failed to pipe body (because it's null) into ${fPath}`
                logger.error(err)
                await asset.delete()
                reject(err)
                doneCallback(false)
            }
        })
    }
}
