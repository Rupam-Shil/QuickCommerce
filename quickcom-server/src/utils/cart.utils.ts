import { discountCodes, products } from '../store/db.store';
import { CartItem, ProductItem } from '../types/common.types';
import { sanitizeProductData } from './product.utils';

export const isValidCartItem = (cart: CartItem): CartItem | undefined => {
	const { itemId, itemName, price, quantity } = cart;
	//NOTE: Assuming price and quantity has to be > 0
	if (!(itemId && itemName && price && quantity)) {
		return;
	}
	const product = products.find((product) => product.itemId === itemId);
	if (!product) return;
	// sanitize data
	return getCartItemFromProduct(sanitizeProductData(product));
};

export const getCartItemFromProduct = (product: ProductItem): CartItem => {
	const { itemId, itemName, price } = product;
	return { itemId, itemName, price, quantity: 1 };
};

export const isValidDiscountCoupon =
	(code: string) =>
	(userId: string): boolean => {
		const storedCode = discountCodes[code];
		if (!storedCode) return false;
		if (
			storedCode &&
			!storedCode.isUsed &&
			(!storedCode.userId || storedCode.userId === userId)
		) {
			return true;
		}
		return false;
	};
