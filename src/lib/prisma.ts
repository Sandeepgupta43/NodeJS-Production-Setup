import { PrismaClient } from '@prisma/client'

import config from '../config/config'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error']
    })

if (config.ENV !== 'production') globalForPrisma.prisma = prisma
