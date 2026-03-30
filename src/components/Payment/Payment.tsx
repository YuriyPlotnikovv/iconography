import {JSX} from 'react';
import paymentStyles from './Payment.module.scss';
import clsx from 'clsx';
import {createSanitizedHTML} from '@/functions/functions';
import {OrderFromServer} from '@/types/types';
import cockpit from '@/lib/CockpitAPI';

export default async function Payment(): Promise<JSX.Element | null> {
    const orderInfo: OrderFromServer | null = await cockpit.getSingleItem('order');

    if (!orderInfo) {
        return null;
    }

    const description = orderInfo.description;

    return (
        <section className={clsx('section', paymentStyles['payment'])}>
            <div className="container">
                <h2 className="section__title">
                    Оплата и доставка
                </h2>

                <div className={clsx('block-html', paymentStyles['payment__info'])}
                     dangerouslySetInnerHTML={createSanitizedHTML(description)}
                />
            </div>
        </section>
    );
}