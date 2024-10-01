import { nanoid } from 'nanoid';
import { DiscountCode } from '../types/common.types';
import { DiscountCodes } from '../types/model.types';

export const getRandomId = (size?: number) => nanoid(size);

export const generateDiscountCode = (): string => {
	return `DISCOUNT-${getRandomId}`;
};
