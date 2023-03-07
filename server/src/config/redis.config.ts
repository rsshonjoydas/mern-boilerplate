import connectRedis from 'connect-redis';
import { Application } from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import logger from '../utils/logger.utils';
import env from './app.config';

const redis = (app: Application) => {
  // TODO: Configure redis client
  const url = `${env.REDIS_URL}`;
  const redisClient = createClient({
    legacyMode: true,
    url,
  });

  // ? Configure session middleware
  redisClient.on('error', (err) => {
    logger.error(err);
  });

  redisClient.on('connect', () => {
    logger.info('Successfully connected to Redis.');
  });

  const RedisStore = connectRedis(session);
  const store = new RedisStore({ client: redisClient });

  app.use(
    session({
      store,
      secret: `${env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: `${env.NODE_ENV}` === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // ? 24 hours
      },
    })
  );

  redisClient.connect().catch(logger.error);
};

export default redis;
