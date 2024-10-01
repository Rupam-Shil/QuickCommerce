import { generateRoutes } from './routes';
import { AppServer } from './utils/app.utils';

const server = new AppServer();
generateRoutes(server);
server.start();
