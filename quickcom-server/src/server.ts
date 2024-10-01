import { generateRoutes } from './routes';
import { AppServer } from './utils/app.utils';
import { fillInventory } from './utils/product.utils';

// create server
const server = new AppServer();

// populate routes
generateRoutes(server);

// fill inventory
(async () => {
	try {
		await fillInventory();
	} catch (error) {
		console.error('Failed to fill inventory', error);
	}
})();

// start the server
server.start();

export default server.server;
