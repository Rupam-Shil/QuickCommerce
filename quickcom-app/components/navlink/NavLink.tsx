'use client';
import React from 'react';
import styles from './navlink.module.scss';
import { cn } from '@/utils/class.utils';
type NavLinkProps = {
	children: React.ReactNode;
	onClick?: () => void;
	active?: boolean;
};

function NavLink({
	children,
	onClick = () => {},
	active = false,
}: NavLinkProps) {
	const handleOnClick = () => {
		if (active) return;
		onClick();
	};

	return (
		<div
			onClick={handleOnClick}
			tabIndex={0}
			className={cn(styles.nav_link, {
				[styles.active]: active,
			})}
		>
			<div>{children}</div>
		</div>
	);
}

export default NavLink;
