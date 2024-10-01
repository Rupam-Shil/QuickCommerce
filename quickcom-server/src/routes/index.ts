import { ROUTE_PREFIX } from '../constants/config.contants';
import { AppServer } from '../utils/app.utils';
import AdminRouter from './admin.route';

const routeMap = {
	admin: AdminRouter,
};

/**
 * Registers all routes in the routeMap to the given AppServer instance.
 * @param app - The AppServer instance to register the routes to.
 */
export const generateRoutes = (app: AppServer) => {
	for (const route in routeMap) {
		app.server.use(
			`${ROUTE_PREFIX}/${route}`,
			routeMap[route as keyof typeof routeMap]
		);
	}
};
