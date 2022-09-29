import express, { Application } from 'express';
import { getCurrencyConversion, email } from '../controllers/currencyConversionController'

const currencyConversionRouter: Application = express();

currencyConversionRouter.post('/', getCurrencyConversion);

currencyConversionRouter.post('/test', email);

export default currencyConversionRouter;

