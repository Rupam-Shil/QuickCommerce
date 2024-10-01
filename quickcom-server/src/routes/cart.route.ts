import {
	addItemToCart,
	getUserDiscounts,
	getUsersCart,
	performCheckout,
} from '../controllers/cart.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { AppServer } from '../utils/app.utils';

const router = AppServer.getRouter();
router.use(isAuthenticated);

router.post('/add', addItemToCart);
router.get('/', getUsersCart);
router.post('/checkout', performCheckout);
router.get('/discounts', getUserDiscounts);

export default router;
