// src/utils/PrismaTransport.ts
import Transport from 'winston-transport'
import { LogEntry } from 'winston'

import { prisma } from '../lib/prisma'

interface PrismaLogOptions extends Transport.TransportStreamOptions {
    metaField?: string
}

export class PrismaTransport extends Transport {
    metaField: string

    constructor(opts: PrismaLogOptions) {
        super(opts)
        this.metaField = opts.metaField || 'meta'
    }

    async log(info: LogEntry, callback: () => void) {
        setImmediate(() => this.emit('logged', info))

        const {
            level,
            message,
            method,
            endpoint,
            req,
            res,
            responsecode,
            responsetime,
            timestamp = new Date()
        }: LogEntry & {
            method?: string | null
            endpoint?: string | null
            req?: string | null
            res?: string | null
            responsecode?: string | null
            responsetime?: string | null
            timestamp?: string | number | Date
        } = info

        const meta = (info[this.metaField] as Record<string, unknown>) || {}

        try {
            await prisma.log.create({
                data: {
                    level,
                    message: message.toString(),
                    timestamp: new Date(timestamp),
                    meta: JSON.stringify(meta),
                    method,
                    endpoint,
                    req,
                    res,
                    responsecode,
                    responsetime: responsetime ? Number(responsetime) : undefined
                }
            })
        } catch (err) {
            console.error('❌ Failed to insert log into DB:', err)
        }

        callback()
    }
}
