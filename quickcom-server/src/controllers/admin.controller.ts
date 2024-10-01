import { Response, Request } from 'express';
import { adminUserIds, discountCodes, stats } from '../store/db.store';
import { generateDiscountCode } from '../utils/helpers.utils';

/**
 * Returns the current admin stats.
 * @returns {Response} A response with a JSON object containing the admin stats.
 */
export const getAdminStats = (req: Request, res: Response) => {
	res.status(200).json({
		...stats,
	});
};

/**
 * Generates a new discount code and stores it in the database.
 * @returns {Response} A response with a JSON object containing the generated discount code and a success message.
 */
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

/**
 * Creates a new admin user.
 * @returns {Response} A response with a JSON object containing the message 'User created successfully'
 * if the user is created successfully, otherwise a 400 response with an appropriate error message.
 */

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
