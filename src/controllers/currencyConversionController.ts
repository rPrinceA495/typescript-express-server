import express, {Request, Response, NextFunction, Application} from 'express';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

import CurrencyConversion  from '../models/CurrencyConversion';

const apiURL = `https://openexchangerates.org/api/latest.json`
const appId = process.env.APP_ID;

export const getCurrencyConversion = async (req: Request, res: Response, next: NextFunction) : Promise<express.Response<any, Record<string, any>>> => {
    try{

        const { targetCurrency, conversionAmount, email } = req.body;

        let currencyConversion : CurrencyConversion = new CurrencyConversion("USD", targetCurrency, conversionAmount);

        const { data } = await axios.get(`${apiURL}/?app_id=${appId}`);

        currencyConversion.ratesObject = data.rates;

        const emailMessage : string = `${currencyConversion.conversionAmount} ${currencyConversion.baseCurrency} converts to ${currencyConversion.convert()} ${currencyConversion.targetCurrency}.`;

        console.log(emailMessage);

        return res.status(200).json({ status: 'Conversion in progress...', meessage: 'You will receive an email of the conversion shortly.' })
        
      }catch(err){
        console.error(err);
        return res.json("Error.")
      }
    
}