'use client';

import {JSX, useState, useEffect, useRef} from 'react';
import headerMenuStyles from './HeaderMenu.module.scss';
import clsx from 'clsx';
import Menu from '@/components/Menu/Menu';

export default function HeaderMenu(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

    const handleMenuButtonClick = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const htmlElement = document.querySelector('html');

        if (htmlElement) {
            if (isMenuOpen) {
                htmlElement.classList.add('fixed');

                if (firstMenuItemRef.current) {
                    firstMenuItemRef.current.focus();
                }
            } else {
                htmlElement.classList.remove('fixed');
            }
        }

        return () => {
            if (htmlElement) {
                htmlElement.classList.remove('fixed');
            }
        };
    }, [isMenuOpen]);

    return (
        <>
            <button className={clsx(headerMenuStyles['menu-button'], isMenuOpen && headerMenuStyles['menu-button--menu-open'])}
                    type="button"
                    aria-label="Открыть/закрыть меню"
                    onClick={handleMenuButtonClick}
            >
                <span className={headerMenuStyles['menu-button-line']}></span>
                <span className={headerMenuStyles['menu-button-line']}></span>
                <span className={headerMenuStyles['menu-button-line']}></span>
            </button>

            <nav className={clsx(headerMenuStyles['navigation'], isMenuOpen && headerMenuStyles['navigation--open'])}
                 aria-label="Основная по сайту"
            >
                <Menu addClass={headerMenuStyles['menu']}
                      onCloseMenu={closeMenu}
                      firstMenuItemRef={firstMenuItemRef}
                />
            </nav>
        </>
    );
}