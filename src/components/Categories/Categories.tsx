import {JSX} from 'react';
import categoriesStyles from './Categories.module.scss';
import {CardItem} from '@/types/types';
import Card from '@/components/Card/Card';
import clsx from 'clsx';

const categoriesList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category/1',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category/2',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category/3',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category/4',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category/5',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function Categories(): JSX.Element {
    return (
        <section className={clsx('section', categoriesStyles['categories'])}>
            <div className="container">
                <h2 className="visually-hidden">
                    Категории икон
                </h2>

                <ul className={categoriesStyles['categories__list']}>
                    {
                        categoriesList.map((categories) => {
                            return (
                                <li className={categoriesStyles['categories__item']} key={categories.id}>
                                    <Card data={categories}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}