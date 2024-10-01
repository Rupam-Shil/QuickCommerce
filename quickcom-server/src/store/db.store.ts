import { AdminStats, Carts, DiscountCodes, Orders } from '../types/model.types';

const carts: Carts = {};
const orders: Orders = [];
const discountCodes: DiscountCodes = {};
const stats: AdminStats = {
	totalItemsPurchased: 0,
	totalPurchaseAmount: 0,
	totalDiscountAmount: 0,
	discountCodesGenerated: [],
};

export { carts, orders, discountCodes, stats };
