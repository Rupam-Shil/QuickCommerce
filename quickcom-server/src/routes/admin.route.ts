import { NextFunction, Request, Response, Router } from 'express';
import { AppServer } from '../utils/app.utils';
import {
	createAdminUser,
	getAdminStats,
	getDiscountCode,
} from '../controllers/admin.controller';
import { isAdmin } from '../middleware/roles.middleware';

const router = AppServer.getRouter();
router.use(isAdmin);
router.post('/generate-discount-code', getDiscountCode);
router.get('/stats', getAdminStats);
router.post('/create-admin', createAdminUser);

export default router;
