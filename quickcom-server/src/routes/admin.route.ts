import { NextFunction, Request, Response, Router } from 'express';
import { AppServer } from '../utils/app.utils';
import {
	createAdminUser,
	getAdminStats,
} from '../controllers/admin.controller';
import { isAdmin } from '../middleware/roles.middleware';

const router = AppServer.getRouter();
router.use(isAdmin);
router.post('/create-admin', createAdminUser);
router.get('/stats', getAdminStats);

export default router;
