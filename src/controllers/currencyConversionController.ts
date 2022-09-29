import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

import CurrencyConversion  from '../models/CurrencyConversion';

import { Squiss, Message } from 'squiss-ts';

const awsConfig = {
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  region: 'dummy',
  endpoint: 'http://localhost:9324'
};

const squiss = new Squiss({
  awsConfig,
  queueName: 'my-sqs-queue',
  bodyFormat: 'json',
  maxInFlight: 15
});

squiss.on('message', (message: Message) => {
  console.log(`${message.body.name}: ${JSON.stringify(message.body.message)}.`);
  message.del();
});

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
        const messageBody : string = `${currencyConversion.conversionAmount} ${currencyConversion.baseCurrency} converts to ${currencyConversion.convert()} ${currencyConversion.targetCurrency}.`;
        console.log(messageBody);
        // await emailConversionResult(messageBody);
        return res.status(200).json({ status: `Conversion in progress... You will receive an email message of the conversion shortly.`, meessageBody: messageBody })
        
      }catch(err){
        console.error(err);
        return res.status(500).json({status: "Error", message: err});
      }
    
}

export const email = async (req: Request, res: Response, next: NextFunction) : Promise<express.Response<any, Record<string, any>>> => {
  try{

    squiss.on('message', (message: Message) => {
      console.log(`${message.body.name} says: ${JSON.stringify(message.body.message)} and has attripute p1 with value ${message.attributes.p1}`);
      message.del();
    });
    
    squiss.start();
    
    const messageToSend = {
        name: 'messageName',
        message: "Conversion is",
    }
    
    const propsToSend = {
        p1: 1,
        p2: 2,
    };
    
    await squiss.sendMessage(messageToSend, 0, propsToSend);

    return res.status(200).json({ status: 'Message sent.' })
      
    }catch(err){
      console.error(err);
      return res.status(500).json({status: "Error", message: err})
    }
  
}

export const emailConversionResult = async (messageBody: string) => {
  
  squiss.start();
  
  const messageToSend = {
      name: 'Conversion result',
      message: messageBody,
  }
  
  const propsToSend = {};
  
  await squiss.sendMessage(messageToSend, 0, propsToSend);

}