import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import env from './config/app.config';
import redis from './config/redis.config';

// TODO: Express JS Configuration
const app: Application = express();

// TODO: express-rate-limit options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // ? 15 minutes
  max: 1000, // ? limit each IP to 1000 requests per windowMs
});

// TODO: cors configuration
let corsOptions = {
  origin: env.CLIENT_APP_URL,
  credentials: true,
  optionsSuccessStatus: 200, // ? some legacy browsers (IE11, various SmartTVs) choke on 204
};

redis(app);

// TODO: Necessary Packages
app
  .use(express.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression())
  .use(cors(corsOptions))
  .use(helmet())
  .use(pinoHttp())
  .use(limiter);

export default app;
