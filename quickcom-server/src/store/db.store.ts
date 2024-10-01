import { ProductItem } from '../types/common.types';
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
const adminUserIds: string[] = ['admin-1'];
const products: ProductItem[] = [];

export { carts, orders, discountCodes, stats, adminUserIds, products };
