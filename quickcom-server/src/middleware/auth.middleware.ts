import { NextFunction, Request, Response } from 'express';

// NOTE: Ideally this userId should be extracted from jwt token which can be present in body/cookies/authorization-header
export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { userId } = req.body;
	if (!userId) {
		res.status(401).json({
			error: 'Unauthorized',
		});
		return;
	}
	next();
};
