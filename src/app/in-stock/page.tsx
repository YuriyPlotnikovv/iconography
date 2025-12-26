import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, CardItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Works from '@/components/Works/Works';

export const metadata: Metadata = {
    title: 'Рукописные иконы в наличии | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Рукописные иконы в наличии',
    },
];

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

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Рукописные иконы в наличии'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Works worksList={inStockList}/>
        </>
    );
}