import { Request, Response } from 'express';
import { CartItem } from '../types/common.types';
import { isValidCartItem } from '../utils/cart.utils';
import { carts } from '../store/db.store';

/**
 * Adds a given item to the user's cart.
 * @param {string} req.body.userId The user ID of the user whose cart is to be updated.
 * @param {CartItem} req.body The cart item data to be added.
 * @returns {Response} A response with a JSON object containing the message 'Item added to cart successfully'.
 */
export const addItemToCart = (req: Request, res: Response) => {
	const { userId, ...cartItemData } = req.body as CartItem & { userId: string };
	if (!isValidCartItem(cartItemData)) {
		res.status(400).json({ error: 'Invalid cart item data' });
		return;
	}

	if (!carts[userId]) {
		carts[userId] = [];
	}
	carts[userId].push(cartItemData);
	res.status(200).json({ message: 'Item added to cart successfully' });
};

/**
 * Gets the cart items for a given user.
 * @param {string} req.body.userId The user ID of the user whose cart is to be retrieved.
 * @returns {Response} A response with a JSON object containing the cart items of the user.
 */
export const getUsersCart = (req: Request, res: Response) => {
	const { userId } = req.body;
	const userCartItems = carts[userId] || [];
	// NOTE: Assuming there will be future implementation of pagination
	res.status(200).json({
		cartItems: userCartItems,
		total: userCartItems.length,
		limit: userCartItems.length,
		offset: 0,
	});
};
