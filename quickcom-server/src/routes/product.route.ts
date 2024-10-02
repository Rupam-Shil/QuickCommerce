import { fetchProducts } from '../controllers/products.controller';
import { AppServer } from '../utils/app.utils';

const router = AppServer.getRouter();

router.get('/', fetchProducts);

export default router;
