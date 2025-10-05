import {JSX} from 'react';
import advantagesStyles from './Advantages.module.scss';
import {AdvantageItem} from '@/types/types';
import clsx from 'clsx';

const advantagesList: AdvantageItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Текст',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Текст',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Текст',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Текст',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Текст',
    },
    {
        id: 6,
        title: 'Заголовок',
        text: 'Текст',
    },
];

export default function Advantages(): JSX.Element {
    return (
        <section className={clsx('section', advantagesStyles['advantages'])}>
            <div className="container">
                <h2 className="section__title">
                    Преимущества заказа у нас
                </h2>

                <ul className={advantagesStyles['advantages__list']}>
                    {
                        advantagesList.map(item => {
                            return (
                                <li className={advantagesStyles['advantages__item']} key={item.id}>
                                    <h3 className={advantagesStyles['advantages__item-title']}>
                                        {item.title}
                                    </h3>

                                    <div className={advantagesStyles['advantages__item-text']}>
                                        {item.text}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}