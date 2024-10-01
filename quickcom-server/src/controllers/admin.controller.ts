import { Response, Request } from 'express';
import { adminUserIds, discountCodes, stats } from '../store/db.store';
import { generateDiscountCode } from '../utils/helpers.utils';

export const getAdminStats = (req: Request, res: Response) => {
	res.status(200).json({
		...stats,
	});
};

export const getDiscountCode = (req: Request, res: Response) => {
	const { linkToUserId } = req.body;
	const code = generateDiscountCode();
	discountCodes[code] = {
		code,
		isUsed: false,
		...(linkToUserId && { userId: linkToUserId }),
	};
	stats.discountCodesGenerated.push(code);
	res.status(200).json({
		code,
		message: 'Discount code generated successfully',
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
