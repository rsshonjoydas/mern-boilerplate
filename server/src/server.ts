import app from './app';
import env from './config/app.config';
import logger from './utils/logger.utils';

const PORT = env.APP_PORT;

app.listen(PORT, () => logger.info(`Server connected to http://localhost:${PORT}`));
