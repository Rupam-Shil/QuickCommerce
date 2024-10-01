// tests/cart.test.ts

import request from 'supertest';
import app from '../src/server';
import { carts, products } from '../src/store/db.store';
import { ROUTE_PREFIX } from '../src/constants/config.constants';

import { fillInventory } from '../src/utils/product.utils';
import { beforeEach } from 'node:test';

describe('Cart Routes', () => {
	const userId = '1';
	const cartBaseUrl = `${ROUTE_PREFIX}/cart`;
	const testItem = {
		userId: '1',
		itemId: 1,
		itemName: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: 100,
		quantity: 1,
	};

	beforeAll(async () => {
		// populate inventory
		await fillInventory();
	});

	afterEach(() => {
		// Clear the cart after each test
		carts[userId] = [];
	});

	test('Add Item to Cart - Success', async () => {
		const response = await request(app)
			.post(`${cartBaseUrl}/add`)
			.send(testItem);
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Item added to cart successfully');
		expect(carts[userId]).toHaveLength(1);
	});

	test('Add Item to Cart - Invalid Data', async () => {
		const invalidItem = { ...testItem, itemId: 'invalid' };
		const response = await request(app)
			.post(`${cartBaseUrl}/add`)
			.send(invalidItem);

		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Invalid cart item data');
	});

	test('Checkout - Success without Discount', async () => {
		await request(app).post(`${cartBaseUrl}/add`).send(testItem);

		const response = await request(app).post(`${cartBaseUrl}/checkout`).send({
			userId,
		});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Order placed successfully');
		expect(response.body.order).toBeDefined();
		expect(response.body.order.totalAmount).toBe(100);
		expect(response.body.order.discountAmount).toBe(0);
		expect(carts[userId]).toHaveLength(0);
	});

	test('Checkout - Empty Cart', async () => {
		const response = await request(app)
			.post(`${cartBaseUrl}/checkout`)
			.send({ userId });

		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Cart is empty');
	});

	test('Checkout - Invalid Discount Code', async () => {
		await request(app).post(`${cartBaseUrl}/add`).send(testItem);

		const response = await request(app)
			.post(`${cartBaseUrl}/checkout`)
			.send({ userId, discountCode: 'INVALIDCODE' });

		expect(response.status).toBe(400);
		expect(response.body.error).toBe('Invalid/Expired discount code');
	});
});
