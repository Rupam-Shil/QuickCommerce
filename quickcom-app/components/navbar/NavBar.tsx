'use client';
import React from 'react';
import styles from './navbar.module.scss';
import { cn } from '@/utils/class.utils';
import NavLink from '../navlink/NavLink';
import Link from 'next/link';

function Navbar() {
	return (
		<header className={cn(styles.navbar)}>
			<div className={cn(styles.navbar__con)}>
				<Link href={'/'} className={styles.navbar__logo}>
					QuickCom
				</Link>
				<div className="flex gap-2">
					<NavLink>adsfasf</NavLink>
					<NavLink active>adsfasf</NavLink>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
