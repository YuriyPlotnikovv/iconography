'use client';

import {JSX, useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Contacts from '@/components/Contacts/Contacts';
import Logo from '@/components/Logo/Logo';
import Social from '@/components/Social/Social';
import Menu from '@/components/Menu/Menu';
import headerStyles from './Header.module.scss';

export default function Header(): JSX.Element {
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
        <header className={headerStyles['header']}>
            <div className={clsx('container', headerStyles['header__container'])}>
                <Logo addClass={headerStyles['header__logo']}/>

                <Contacts addClass={headerStyles['header__contacts']}/>

                <address className={headerStyles['header__address']}>
                    <p>Город, улица, дом</p>
                </address>

                <Social addClass={headerStyles['header__social-desktop']}/>

                <button className={clsx(headerStyles['header__menu-button'], isMenuOpen && headerStyles['header__menu-button--menu-open'])}
                    type="button"
                    aria-label="Открыть/закрыть меню"
                    onClick={handleMenuButtonClick}
                >
                    <span className={headerStyles['header__menu-button-line']}></span>
                    <span className={headerStyles['header__menu-button-line']}></span>
                    <span className={headerStyles['header__menu-button-line']}></span>
                </button>

                <nav className={clsx(headerStyles['header__navigation'], isMenuOpen && headerStyles['header__navigation--open'])}
                    aria-label="Основная по сайту"
                >
                    <Menu addClass={headerStyles['header__menu']}
                          onCloseMenu={closeMenu}
                          firstMenuItemRef={firstMenuItemRef}
                    />

                    <Social addClass={headerStyles['header__social-mobile']}/>
                </nav>
            </div>
        </header>
    );
}