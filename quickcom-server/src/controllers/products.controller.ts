import { Response, Request } from 'express';
import { products } from '../store/db.store';
import { ProductItem } from '../types/common.types';
import { sanitizeProductData } from '../utils/product.utils';

export const fetchProducts = async (req: Request, res: Response) => {
	if (products.length === 0) {
		try {
			const response = await fetch('https://fakestoreapi.com/products');
			const data = await response.json();
			const productData: ProductItem[] = data.map(sanitizeProductData);
			products.push(...productData);
		} catch (error) {
			res.status(500).json({ error: 'Failed to fetch products' });
			return;
		}
	}
	// NOTE: Assuming there will be future implementation of pagination
	res.status(200).json({
		products,
		total: products.length,
		limit: products.length,
		offset: 0,
	});
};
