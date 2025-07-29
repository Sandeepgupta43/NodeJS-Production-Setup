import { Request } from 'express'

import { THttpError } from '../types/type'
import responseMessage from '../constant/responseMessage'
import config from '../config/config'
import { EApplicationEnviroment } from '../constant/application'

import logger from './logger'

export default (err: Error, req: Request, errorStatusCode: number = 500): THttpError => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    logger.error('Controller Error ', {
        meta: errorObj
    })

    if (config.ENV === EApplicationEnviroment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return errorObj
}
