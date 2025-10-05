import {JSX} from 'react';
import contactsPageStyles from './ContactsPage.module.scss';
import clsx from 'clsx';
import Social from '@/components/Social/Social';
import FormContacts from '@/components/Forms/FormContacts/FormContacts';

export default function ContactsPage(): JSX.Element {
    return (
        <>
            <section className={clsx('section', contactsPageStyles['contacts'])}>
                <div className={clsx('container', contactsPageStyles['contacts__container'])}>
                    <h2 className="visually-hidden">
                        Контакты
                    </h2>

                    <ul className={contactsPageStyles['contacts__list']}>
                        <li className={contactsPageStyles['contacts__item']}>
                            <a className={contactsPageStyles['contacts__link']} href="#">
                                <address className={contactsPageStyles['contacts__address']}>
                                    <span className={contactsPageStyles['contacts__link-caption']}>Адрес:</span>
                                    <span
                                        className={contactsPageStyles['contacts__link-value']}>Город, улица, дом</span>
                                </address>
                            </a>
                        </li>

                        <li className={contactsPageStyles['contacts__item']}>
                            <a className={contactsPageStyles['contacts__link']} href="mailto:test@test.ru">
                                <span className={contactsPageStyles['contacts__link-caption']}>Email:</span>
                                <span className={contactsPageStyles['contacts__link-value']}>test@test.ru</span>
                            </a>
                        </li>

                        <li className={contactsPageStyles['contacts__item']}>
                            <a className={contactsPageStyles['contacts__link']} href="tel:+79999999999">
                                <span className={contactsPageStyles['contacts__link-caption']}>Телефон:</span>
                                <span className={contactsPageStyles['contacts__link-value']}>+7 (999) 999 99-99</span>
                            </a>
                        </li>
                    </ul>

                    <Social addClass={contactsPageStyles['contacts__social']}/>

                    <div className={contactsPageStyles['contacts__map']} id="map"></div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section__title">
                        Связаться с нами
                    </h2>

                    <FormContacts/>
                </div>
            </section>
        </>
    );
}