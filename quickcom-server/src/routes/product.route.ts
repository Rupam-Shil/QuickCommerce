import { fetchProducts } from '../controllers/products.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { AppServer } from '../utils/app.utils';

const router = AppServer.getRouter();
router.use(isAuthenticated);

router.get('/', fetchProducts);

export default router;
