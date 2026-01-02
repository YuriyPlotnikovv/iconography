import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, SlideItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Detail from '@/components/Detail/Detail';

export const metadata: Metadata = {
    title: 'Новость детально | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Новости',
        url: '/news',
    },
    {
        title: 'Заголовок новости',
    },
];

const slidesList: SlideItem[] = [
    {
        id: 1,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: '/news/1'
    },
    {
        id: 2,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: '/news/2'
    },
    {
        id: 3,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: '/news/3'
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Заголовок новости'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Detail slidesList={slidesList} title={'Заголовок новости'} description={'<p>Текст новости</p>'}/>
        </>
    );
}