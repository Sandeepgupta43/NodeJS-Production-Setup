import { NextFunction, Request, Response } from 'express'

import { rateLimiter } from '../config/rateLimiter'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'

export default async (req: Request, _: Response, next: NextFunction) => {
    try {
        // Use IP as the unique key
        await rateLimiter.consume(req.ip as string, 1)
        next()
    } catch (error) {
        httpError(next, new Error(responseMessage.TOO_MANY_REQUEST) || error, req, 429)
    }
}
