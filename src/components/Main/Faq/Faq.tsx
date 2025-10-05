import {JSX} from 'react';
import faqStyles from './Faq.module.scss';
import clsx from 'clsx';
import {FaqItem} from '@/types/types';

const faqList: FaqItem[] = [
    {
        id: 1,
        question: 'Вопрос',
        answer: 'Ответ',
    },
    {
        id: 2,
        question: 'Вопрос',
        answer: 'Ответ',
    },
    {
        id: 3,
        question: 'Вопрос',
        answer: 'Ответ',
    },
];

export default function Faq(): JSX.Element {
    return (
        <section className={clsx('section', faqStyles['faq'])} id="faq">
            <div className="container">
                <h2 className="section__title">
                    Вопрос-ответ
                </h2>

                <ul className={faqStyles['faq__list']}>
                    {
                        faqList.map((faq) => {
                            return (
                                <li className={faqStyles['faq__item']} key={faq.id}>
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