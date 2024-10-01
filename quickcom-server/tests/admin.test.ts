import request from 'supertest';
import { discountCodes } from '../src/store/db.store';
import app from '../src/server';
import { ROUTE_PREFIX } from '../src/constants/config.constants';

const adminData = {
	userId: 'admin-1',
};

describe('Admin Routes', () => {
	const adminBaseUrl = `${ROUTE_PREFIX}/admin`;
	test('Generate Discount Code - Success', async () => {
		const response = await request(app)
			.post(`${adminBaseUrl}/generate-discount-code`)
			.send(adminData);

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Discount code generated successfully');
		expect(discountCodes[response.body.code]).toBeDefined();
	});

	test('Get Statistics - Success', async () => {
		const response = await request(app)
			.get(`${adminBaseUrl}/stats`)
			.send(adminData);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('totalItemsPurchased');
		expect(response.body).toHaveProperty('totalPurchaseAmount');
		expect(response.body).toHaveProperty('totalDiscountAmount');
		expect(response.body).toHaveProperty('discountCodesGenerated');
	});

	test('Create Admin User - Success', async () => {
		const response = await request(app)
			.post(`${adminBaseUrl}/create-admin`)
			.send({
				...adminData,
				newUserId: 'admin-2',
			});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('User created successfully');
	});
});
