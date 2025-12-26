import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, CardItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Works from '@/components/Works/Works';

export const metadata: Metadata = {
    title: 'Наши работы | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Наши работы',
    },
];

const worksList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/works/1',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/works/2',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/works/3',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/works/4',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/works/5',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Наши работы'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Works worksList={worksList}/>
        </>
    );
}