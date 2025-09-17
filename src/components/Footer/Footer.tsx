import {JSX} from 'react';
import styles from './Footer.module.scss'

type FooterProps = {
    children?: React.ReactNode;
}

export default function Footer({}: FooterProps): JSX.Element {
    return (
        <footer className="page__footer footer">
            <div className="container">
                <img className="footer__logo logo" src="#" alt="Лого"/>

                <nav className="footer__navigation" aria-label="Дополнительная по сайту">
                    <ul className="footer__menu menu">
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
                                Контакты
                            </a>
                        </li>
                    </ul>

                    <ul className="footer__social social" aria-label="Социальные сети">
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

                <p className="footer__copyright">
                    © Иконописная мастерская, 2025
                </p>

                <a className="footer__developer developer" href="https://yuriyplotnikovv.ru" target="_blank">
                    <span className="developer__text">Дизайн и разработка:</span>

                    <img className="developer__logo" src="#" alt="YuriyPlotnikovv | Frontend-разработчик"/>
                </a>
            </div>
        </footer>
    );
}