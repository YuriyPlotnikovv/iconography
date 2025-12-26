import {JSX} from 'react';
import newsStyles from './News.module.scss';
import {CardItem} from '@/types/types';
import Card from '@/components/Card/Card';
import clsx from 'clsx';

const newsList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание',
        href: '/news/test-1',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание',
        href: '/news/test-2',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание',
        href: '/news/test-3',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание',
        href: '/news/test-4',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание',
        href: '/news/test-5',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function News(): JSX.Element {
    return (
        <section className={clsx('section', newsStyles['news'])}>
            <div className="container">
                <h2 className="visually-hidden">
                    Список новостей
                </h2>

                <ul className={newsStyles['news__list']}>
                    {
                        newsList.map((news) => {
                            return (
                                <li className={newsStyles['news__item']} key={news.id}>
                                    <Card data={news}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}