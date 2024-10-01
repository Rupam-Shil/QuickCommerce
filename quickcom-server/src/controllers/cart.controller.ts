import { Request, Response } from 'express';
import { CartItem, Order } from '../types/common.types';
import { isValidCartItem, isValidDiscountCoupon } from '../utils/cart.utils';
import {
	carts,
	discountCodes,
	orderDetails,
	orders,
	stats,
} from '../store/db.store';
import { NTH_ORDER } from '../constants/config.constants';
import { generateDiscountCode } from '../utils/helpers.utils';

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

/**
 * Performs checkout for a given user.
 * @param {string} req.body.userId The user ID of the user whose cart is to be checked out.
 * @param {string} [req.body.discountCode] The discount code to be used for the checkout.
 * @returns {Response} A response with a JSON object containing the order details and a message.
 */
export const performCheckout = (req: Request, res: Response) => {
	const { userId, discountCode } = req.body;

	// check if user has item
	const userCartItem = carts[userId] || [];

	if (userCartItem.length === 0) {
		res.status(400).json({ error: 'Cart is empty' });
		return;
	}

	// calculate cart total
	let totalAmount = userCartItem.reduce((acc, item) => acc + item.price, 0);

	// check for valid discount code if code is present
	let discountAmount = 0;
	if (discountCode) {
		if (isValidDiscountCoupon(discountCode)(userId)) {
			discountAmount = totalAmount * 0.1;
			totalAmount -= discountAmount;
			discountCodes[discountCode].isUsed = true;
			stats.totalDiscountAmount += discountAmount;
		} else {
			res.status(400).json({ error: 'Invalid/Expired discount code' });
			return;
		}
	}

	// update admin and order stats
	orderDetails.orderCount += 1;
	const itemsPurchased = userCartItem.reduce(
		(acc, item) => acc + item.quantity,
		0
	);
	stats.totalItemsPurchased += itemsPurchased;
	stats.totalPurchaseAmount += totalAmount;

	// Generate a new discount code if this is every nth order
	const newDiscountCode =
		orderDetails.orderCount % NTH_ORDER === 0 ? generateDiscountCode() : null;
	if (newDiscountCode) {
		discountCodes[newDiscountCode] = {
			code: newDiscountCode,
			isUsed: false,
			userId: userId,
		};
		stats.discountCodesGenerated.push(newDiscountCode);
	}

	// Create and store this order
	const newOrder: Order = {
		orderId: orders.length + 1,
		userId,
		items: userCartItem,
		totalAmount,
		discountAmount,
		discountCodeUsed: discountCode || null,
	};
	orders.push(newOrder);

	// Clear the user's cart
	carts[userId] = [];

	res.status(200).json({
		order: newOrder,
		discountCode: newDiscountCode,
		message:
			`Order placed successfully` +
			(newDiscountCode
				? ` and you have earned a new discount code: ${newDiscountCode}. Apply in you next order to get 10% off`
				: ''),
	});
};

export const getUserDiscounts = (req: Request, res: Response) => {
	const { userId } = req.body;
	const nonExpiredDiscounts = Object.entries(discountCodes)
		.filter(
			([_, { isUsed, userId: codeUserId }]) =>
				!isUsed && (!codeUserId || codeUserId === userId)
		)
		.map(([code]) => code);
	res.status(200).json({ discounts: nonExpiredDiscounts });
};
