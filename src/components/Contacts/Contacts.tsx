import {JSX} from 'react';
import contactsStyles from './Contacts.module.scss';
import clsx from 'clsx';

type ContactsProps = {
    addClass: string,
}

export default function Contacts({addClass}: ContactsProps): JSX.Element {
    return (
        <ul className={clsx(addClass, contactsStyles['contacts'])}>
            <li className={contactsStyles['contacts__item']}>
                <a className={contactsStyles['contacts__link']} href="mailto:test@test.ru">
                    <span className={contactsStyles['contacts__link-value']}>test@test.ru</span>
                </a>
            </li>

            <li className={contactsStyles['contacts__item']}>
                <a className={contactsStyles['contacts__link']} href="tel:+79999999999">
                    <span className={contactsStyles['contacts__link-value']}>+7 (999) 999 99-99</span>
                </a>
            </li>
        </ul>
    );
}