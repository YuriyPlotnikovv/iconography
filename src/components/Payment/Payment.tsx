import {JSX} from 'react';
import paymentStyles from './Payment.module.scss';
import clsx from 'clsx';

export default function Payment(): JSX.Element {
    return (
        <section className={clsx('section', paymentStyles['payment'])}>
            <div className="container">
                <h2 className="section__title">
                    Оплата и доставка
                </h2>

                <div className={paymentStyles['payment__info']}>
                    <p>Информация об оплате и доставке</p>
                </div>
            </div>
        </section>
    );
}