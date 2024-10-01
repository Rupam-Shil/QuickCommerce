import { NextFunction, Request, Response } from 'express';
import { adminUserIds } from '../store/db.store';

/**
 * Express middleware to check if a user is an admin.
 *
 * Checks if the given user ID is present in the adminUserIds array.
 * If the user ID is not present, sends a 401 Unauthorized response.
 * If the user ID is present, calls `next()` to continue the request.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	// NOTE: Ideally this userId should be extracted from jwt token which can be present in body/cookies/authorization-header
	const { userId } = req.body;
	if (!userId || !adminUserIds.includes(userId)) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}
	next();
};
