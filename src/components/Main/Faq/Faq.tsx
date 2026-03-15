import {JSX} from 'react';
import clsx from 'clsx';

import {FaqFromServer} from '@/types/types';
import faqStyles from './Faq.module.scss';
import cockpit from '@/lib/CockpitAPI';

export default async function Faq(): Promise<JSX.Element | null> {
    const faqData: FaqFromServer[] = await cockpit.getCollection('faq');

    if (!faqData || faqData.length === 0) {
        return null;
    }

    return (
        <section className={clsx('section', faqStyles['faq'])} id="faq">
            <div className="container">
                <h2 className="section__title">
                    Вопрос-ответ
                </h2>

                <ul className={faqStyles['faq__list']}>
                    {
                        faqData.map((faq) => {
                            return (
                                <li className={faqStyles['faq__item']} key={faq._id}>
                                    <details className={faqStyles['faq__item-details']} name="question">
                                        <summary className={faqStyles['faq__item-title']}>
                                            {faq.question}
                                        </summary>
                                        <p className={faqStyles['faq__item-text']}>
                                            {faq.answer}
                                        </p>
                                    </details>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}