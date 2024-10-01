import { CartItem, DiscountCode, Order } from './common.types';

export type Carts = { [userId: string]: CartItem[] };
export type Orders = Order[];
export type DiscountCodes = { [code: string]: DiscountCode };

export type AdminStats = {
	totalItemsPurchased: number;
	totalPurchaseAmount: number;
	totalDiscountAmount: number;
	discountCodesGenerated: string[];
};
