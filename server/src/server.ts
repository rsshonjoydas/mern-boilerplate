import app from './app';
import env from './config/app.config';

const PORT = env.APP_PORT;

app.listen(PORT, () => console.log(`Server connected to http://localhost:${PORT}`));
