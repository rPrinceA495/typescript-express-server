import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express';
import {Server} from 'http';


import dotenv from 'dotenv';
dotenv.config();

import {notFoundError, errorHandler} from './middleware/error-handler'

const app: Application = express();
const port = process.env.PORT;

app.use(notFoundError)
app.use(errorHandler)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("Backend service reached.")
})



const server: Server = app.listen(port, () => {
  console.log(`Application server is running at http://localhost:${port}`);
});