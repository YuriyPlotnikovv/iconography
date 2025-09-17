import {JSX} from 'react';
import styles from './Header.module.scss'

type HeaderProps = {
    children?: React.ReactNode;
}

export default function Header({}: HeaderProps): JSX.Element {
    return (
        <header className={styles.header}>
            <div className="container">
                <img className="header__logo logo" src="#" alt=""/>

                <nav className="header__navigation" aria-label="Основная по сайту">
                    <ul className={styles.header__menu}>
                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Наши работы
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Рукописные иконы в наличии
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Реставрация
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Заказ и доставка
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Новости
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Отзывы
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Галерея
                            </a>
                        </li>

                        <li className="menu__item">
                            <a className="menu__link" href="#">
                                Контакты
                            </a>
                        </li>
                    </ul>

                    <ul className="header__social social" aria-label="Социальные сети">
                        <li className="social__item">
                            <a className="social__link" href="#">
                                Vk
                            </a>
                        </li>

                        <li className="social__item">
                            <a className="social__link" href="#">
                                Telegram
                            </a>
                        </li>

                        <li className="social__item">
                            <a className="social__link" href="#">
                                Whatsapp
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}