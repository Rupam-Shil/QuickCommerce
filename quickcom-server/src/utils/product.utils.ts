import { v4 } from 'uuid';
import { ProductItem } from '../types/common.types';

export const sanitizeProductData = (
	product: Record<string, any>
): ProductItem => {
	const {
		id: itemId = v4(),
		title: itemName = '-',
		price,
		image: imageUrl = 'https://picsum.photos/400/400',
		description,
	} = product;
	return { itemId, itemName, price, imageUrl, description };
};
