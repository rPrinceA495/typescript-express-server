import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import createHttpError, { HttpError } from 'http-errors';

export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound)
}

export const errorHandler: ErrorRequestHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.json(
        {
            status: err.status || 500,
            message: err.message
        }
    )
}

