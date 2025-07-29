import path from 'path'

import express, { NextFunction, Request, Response} from 'express'
import helmet from 'helmet'
import cors from 'cors'

import router from './router/api.router'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './utils/httpError'
import config from './config/config'

const app = express()

app.use(helmet())
app.use(cors({
    methods: ['GET','POST','PUT','DELETE','OPTIONS','HEAD'],
    origin: config.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

app.use("/api/v1",router)

// 404 Error handel
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error instanceof Error ? error : new Error(String(error)), req, 404)
    }
})

// Global Error handaler
app.use(globalErrorHandler);

export default app
