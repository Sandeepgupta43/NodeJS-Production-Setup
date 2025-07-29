import { NextFunction, Request, Response } from "express";

import { THttpError } from "../types/type";


export default (err: THttpError, _: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json(err)
    next()
}