import { eq } from 'drizzle-orm'
import db from '../db'
import { usersTable } from '../db/schema'
import logger from '../logger'
import meta from '../meta'
import chalk from 'chalk'

export default async function ensureAdminUsers(): Promise<void> {
    if (!meta.execution.disable_background_jobs && !meta.execution.disable_db) {
        const adminUsers = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.isAdmin, true))
        if (adminUsers.length > 0) {
            logger.info(
                `${adminUsers.length} admins were found, no new ones created`
            )
        } else {
            await db.insert(usersTable).values({
                username: 'admin',
                email: null,
                isAdmin: true,
                pwHash: await Bun.password.hash('123456789abc', {
                    algorithm: 'argon2id',
                    memoryCost: 4,
                    timeCost: 8
                })
            })
            logger.info(
                `As no admin users were found, a new user called ${chalk.yellow('"admin"')} with the password ${chalk.yellow('"123456789abc"')} was created.`
            )
            logger.warn(
                'For security reasons, make sure to change the password of the automatically created user.'
            )
        }
    } else {
        logger.info(
            "Won't check if admin users exist because background jobs or database is disabled"
        )
    }
}
