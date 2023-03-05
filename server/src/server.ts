import express, { Application } from 'express';
import env from './config/app.config';

const app: Application = express();

const PORT = env.APP_PORT;

app.listen(PORT, () =>
  console.log(`Server connected to http://localhost:${PORT}`)
);
