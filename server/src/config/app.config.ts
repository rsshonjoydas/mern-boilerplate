import dotenv from 'dotenv';

dotenv.config();

const env = {
  // ! App environment variables
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: process.env.APP_PORT || 5000,
  CLIENT_APP_URL: process.env.CLIENT_APP_URL || 'http://localhost:3000/',

  // ! Database connection
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379/',

  SESSION_SECRET: process.env.SESSION_SECRET || 'rsshonjoydas',
};

export default env;
