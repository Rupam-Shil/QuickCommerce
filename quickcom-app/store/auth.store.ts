import { User } from '@/types/common.types';
import { create } from 'zustand';

type UserStoreType = {
	user: User | null;
	setUser: (user: User) => void;
	isAuthenticated: () => boolean;
	isAdmin: () => boolean;
};

export const useAuthStore = create<UserStoreType>((set, get) => ({
	user: null,
	setUser: (user) => set({ user }),
	isAuthenticated: () => {
		const { user } = get();
		return !!user;
	},
	isAdmin: () => {
		const { user } = get();
		return !!user?.adminCode;
	},
}));
