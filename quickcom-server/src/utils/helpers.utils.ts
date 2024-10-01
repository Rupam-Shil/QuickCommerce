import { v4 } from 'uuid';

export const getRandomId = () => v4();

/**
 * Generates a discount code with a random ID.
 * @returns a discount code string of the format "DISCOUNT-<random id>"
 */
export const generateDiscountCode = (): string => {
	return `DISCOUNT-${getRandomId()}`;
};
