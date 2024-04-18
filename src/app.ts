require("dotenv").config();
import Logger from '../config/logger';
import express from 'express';
import config from 'config';
import router from './router';
import db from '../config/db';
import morganMiddleware from './middleware/morganMiddleware';

const app = express();
const port = config.get<number>("port");

// Middlewares
app.use(express.json());
app.use(morganMiddleware);

//Rotas
app.use('/api', router);


app.listen(3000, async () => {

  await db();

  Logger.info(`Server working on: http://localhost:${port}`);
});