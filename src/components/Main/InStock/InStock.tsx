import {JSX} from 'react';
import inStockStyles from './InStock.module.scss';
import {CardItem} from '@/types/types';
import clsx from 'clsx';
import Card from '@/components/Card/Card';
import Link from 'next/link';

const inStockList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/in-stock/1',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/in-stock/2',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/in-stock/3',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/in-stock/4',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/in-stock/5',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function InStock(): JSX.Element {
    return (
        <section className={clsx('section', inStockStyles['in-stock'])}>
            <div className="container">
                <h2 className="section__title">
                    Рукописные иконы в наличии
                </h2>

                <ul className={inStockStyles['in-stock__list']}>
                    {
                        inStockList.map(work => {
                            return (
                                <li className={inStockStyles['in-stock__item']} key={work.id}>
                                    <Card data={work}/>
                                </li>
                            );
                        })
                    }
                </ul>

                <Link className="button button--accent" href="/in-stock">Посмотреть ещё</Link>
            </div>
        </section>
    );
}