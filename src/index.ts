import express, { Request, Response, NextFunction, Application } from 'express';

import dotenv from 'dotenv';
dotenv.config();

import {notFoundError, errorHandler} from './middleware/error-handler'

import currencyConversionRouter from './routers/currencyConversionRouter'

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json("Backend service reached.")
})

app.use('/currency-conversion', currencyConversionRouter)

// Use error handling milleware:
app.use(notFoundError)
app.use(errorHandler)

// Configure server to listen for requests
const port: Number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Application server is running at http://localhost:${port}`);
});