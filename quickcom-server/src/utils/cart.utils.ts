import { CartItem } from '../types/common.types';

export const isValidCartItem = (cart: CartItem) => {
	const { itemId, itemName, price, quantity } = cart;
	//NOTE: Assuming price and quantity has to be > 0
	return itemId && itemName && price && quantity;
};
