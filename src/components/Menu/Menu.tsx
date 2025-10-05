"use client";

import {JSX} from 'react';
import menuStyles from './Menu.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {menuItems} from '@/const/const';
import {MenuItem} from '@/types/types';

type MenuProps = {
    addClass: string,
}

export default function Menu({addClass}: MenuProps): JSX.Element {
    const currentPath = usePathname();

    return (
        <ul className={clsx(addClass, menuStyles['menu'])}>
            {
                menuItems.map((menuItem: MenuItem) => {
                    const isActive = menuItem.href === '/'
                        ? currentPath === '/'
                        : currentPath.startsWith(menuItem.href);

                    return (
                        <li className={menuStyles['menu__item']} key={menuItem.href}>
                            <Link className={clsx(menuStyles['menu__link'], isActive && menuStyles['menu__link-current'])} href={menuItem.href}>
                                {menuItem.label}
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}