import { nanoid } from 'nanoid';

export const getRandomId = (size?: number) => nanoid(size);

/**
 * Generates a discount code with a random ID.
 * @returns a discount code string of the format "DISCOUNT-<random id>"
 */
export const generateDiscountCode = (): string => {
	return `DISCOUNT-${getRandomId}`;
};
