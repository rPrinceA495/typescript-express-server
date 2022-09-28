import express, {Request, Response, NextFunction, Application} from 'express';
import {Server} from 'http';


import dotenv from 'dotenv';
dotenv.config();

import {notFoundError, errorHandler} from './middleware/error-handler'

const app: Application = express();


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json("Backend service reached.")
})

app.get('/currency-conversion', (req: Request, res: Response, next: NextFunction) => {
    res.json("Backend service reached.")
})

// Use error handling milleware:
app.use(notFoundError)
app.use(errorHandler)

// Configure server to listen for requests
const port: Number = Number(process.env.PORT) || 8000;
const server: Server = app.listen(port, () => {
  console.log(`Application server is running at http://localhost:${port}`);
});