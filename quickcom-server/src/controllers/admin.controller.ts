import { Response, Request } from 'express';
import { adminUserIds, stats } from '../store/db.store';

export const getAdminStats = (req: Request, res: Response) => {
	res.status(200).json({
		...stats,
	});
};

export const createAdminUser = (req: Request, res: Response) => {
	const { newUserId } = req.body;
	if (!newUserId) {
		res.status(400).json({ error: 'New User ID is required' });
		return;
	}
	const isUserPresent = adminUserIds.includes(newUserId);
	if (isUserPresent) {
		res.status(400).json({ error: 'User already exists' });
	} else {
		adminUserIds.push(newUserId);
		res.json({ message: 'User created successfully' });
	}
};
