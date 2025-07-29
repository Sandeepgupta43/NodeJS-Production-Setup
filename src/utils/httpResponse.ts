import { Request, Response } from 'express'

import { THttpResponse } from '../types/type'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'
import safeJson from '../helper/safeJson'

import logger from './logger'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const sanitizedData: unknown = safeJson(data) // Safe version of BigInt data

    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: sanitizedData
    }

    if (config.ENV === EApplicationEnviroment.PRODUCTION) {
        delete response.request.ip
    }

    logger.info('Controller Response', {
        meta: response // now sanitized
    })

    res.status(responseStatusCode).json(response)
}
