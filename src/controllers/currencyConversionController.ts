import express, {Request, Response, NextFunction, Application} from 'express';

import dotenv from 'dotenv';
dotenv.config();

const apiURL = `https://openexchangerates.org/api/latest.json`
const appId = process.env.APP_ID;

export const getCurrencyConversion = (req: Request, res: Response, next: NextFunction) : Response<any, Record<string, any>> => {
    return res.json("Currency service reached.")
}