import express, { Application } from 'express';
import { getCurrencyConversion } from '../controllers/currencyConversionController'

const currencyConversionRouter: Application = express();

currencyConversionRouter.post('/', getCurrencyConversion)

export default currencyConversionRouter;

