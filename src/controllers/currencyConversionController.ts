import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

import CurrencyConversion  from '../models/CurrencyConversion';

const apiURL = `https://openexchangerates.org/api/latest.json`
const appId = process.env.APP_ID;

export const getCurrencyConversion = async (req: Request, res: Response, next: NextFunction) : Promise<express.Response<any, Record<string, any>>> => {
    try{
        // Gather request parameters 
        const { targetCurrency, conversionAmount } = req.body;
        let currencyConversion : CurrencyConversion = new CurrencyConversion("USD", targetCurrency, conversionAmount);

        // Fetch rates object available under free tier:
        const { data } = await axios.get(`${apiURL}/?app_id=${appId}`);
        currencyConversion.ratesObject = data.rates;

        // Send response to client:
        const emailMessage : string = `${currencyConversion.conversionAmount} ${currencyConversion.baseCurrency} converts to ${currencyConversion.convert()} ${currencyConversion.targetCurrency}.`;
        console.log(emailMessage);
        return res.status(200).json({ status: 'Conversion in progress...', meessage: 'You will receive an email of the conversion shortly.' })
        
      }catch(err){
        console.error(err);
        return res.status(200).json({status: "Error", message: err})
      }
    
}

// const emailConversionResult = async () => {

// }