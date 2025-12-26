'use client';

import {JSX, RefObject} from 'react';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import type {MenuItem} from '@/types/types';
import {menuItems} from '@/const/const';
import menuStyles from './Menu.module.scss';

type MenuProps = {
    addClass?: string;
    onCloseMenu: () => void;
    firstMenuItemRef: RefObject<HTMLAnchorElement | null>;
};

export default function Menu({addClass, onCloseMenu, firstMenuItemRef}: MenuProps): JSX.Element {
    const currentPath = usePathname();

    return (
        <ul className={clsx(addClass, menuStyles.menu)}>
            {menuItems.map((menuItem: MenuItem, index) => {
                const isActive = menuItem.href === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(menuItem.href);

                return (
                    <li className={menuStyles.menu__item} key={menuItem.href}>
                        <Link className={clsx(menuStyles.menu__link, isActive && menuStyles['menu__link--current'])}
                            href={menuItem.href}
                            onClick={onCloseMenu}
                            ref={index === 0 ? firstMenuItemRef : null}
                        >
                            {menuItem.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}