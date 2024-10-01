import { v4 } from 'uuid';
import { ProductItem } from '../types/common.types';
import { products } from '../store/db.store';

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

/**
 * Populates the products array with data from the Fake Store API.
 * If the API request fails, it throws the error.
 */
export const fillInventory = async () => {
	try {
		const response = await fetch('https://fakestoreapi.com/products');
		const data = await response.json();
		const productData: ProductItem[] = data.map(sanitizeProductData);
		products.push(...productData);
	} catch (error) {
		throw error;
	}
};
