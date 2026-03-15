import {JSX} from 'react';
import contactsStyles from './Contacts.module.scss';
import clsx from 'clsx';
import {MainInfo} from '@/types/types';
import cockpit from '@/lib/CockpitAPI';
import {createEmailLink, createPhoneLink} from '@/functions/functions';

type ContactsProps = {
    addClass: string,
}

export default async function Contacts({addClass}: ContactsProps): Promise<JSX.Element> {
    const mainInfo: MainInfo = await cockpit.getSingleItem('maininfo');

    const email = mainInfo.email;
    const phone = mainInfo.phone;

    if (!email && !phone) {
        return (
            <></>
        );
    }

    return (
        <ul className={clsx(addClass, contactsStyles['contacts'])}>
            {
                email && (
                    <li className={contactsStyles['contacts__item']}>
                        <a className={contactsStyles['contacts__link']} href={createEmailLink(email)}>
                            <span className={contactsStyles['contacts__link-value']}>{email}</span>
                        </a>
                    </li>
                )
            }
            {
                phone && (
                    <li className={contactsStyles['contacts__item']}>
                        <a className={contactsStyles['contacts__link']} href={createPhoneLink(phone)}>
                            <span className={contactsStyles['contacts__link-value']}>{phone}</span>
                        </a>
                    </li>
                )
            }
        </ul>
    );
}