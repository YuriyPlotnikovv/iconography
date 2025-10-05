import {JSX} from 'react';
import headerStyles from './Header.module.scss';
import clsx from 'clsx';
import Contacts from '@/components/Contacts/Contacts';
import Logo from '@/components/Logo/Logo';
import Social from '@/components/Social/Social';
import Menu from '@/components/Menu/Menu';

export default function Header(): JSX.Element {
    return (
        <header className={headerStyles['header']}>
            <div className={clsx('container', headerStyles['header__container'])}>
                <Logo addClass={headerStyles['header__logo']}/>

                <Contacts addClass={headerStyles['header__contacts']}/>

                <address className={headerStyles['header__address']}>
                    <p>Город, улица, дом</p>
                </address>

                <Social addClass={headerStyles['header__social']}/>

                <button className={headerStyles['header__menu-button']} type="button" aria-label="Открыть/закрыть меню">
                    <span className={headerStyles['header__menu-button-line']}></span>
                    <span className={headerStyles['header__menu-button-line']}></span>
                    <span className={headerStyles['header__menu-button-line']}></span>
                </button>

                <nav className={headerStyles['header__navigation']} aria-label="Основная по сайту">
                    <Menu addClass={headerStyles['header__menu']}/>
                </nav>
            </div>
        </header>
    );
}