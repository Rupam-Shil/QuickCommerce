export type CartItem = {
	itemId: string;
	itemName: string;
	price: number;
	quantity: number;
};

export type Order = {
	orderId: number;
	userId: string;
	items: CartItem[];
	totalAmount: number;
	discountAmount: number;
	discountCodeUsed: string | null;
};

export type DiscountCode = {
	code: string;
	isUsed: boolean;
};
