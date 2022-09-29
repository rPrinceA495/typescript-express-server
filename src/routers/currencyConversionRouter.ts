import express, { Application } from 'express';
import { getCurrencyConversion } from '../controllers/currencyConversionController'

const currencyConversionRouter: Application = express();

currencyConversionRouter.get('/', getCurrencyConversion)

export default currencyConversionRouter;

