import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, CardItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import GalleryPage from '@/components/GalleryPage/GalleryPage';

export const metadata: Metadata = {
    title: 'Галерея | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Галерея',
    },
];

const galleryList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание',
        href: '/gallery',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/work-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/work-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/work-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание работы',
        href: '/work-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading currentPageTitle={'Галерея'} breadcrumbsList={breadcrumbsList}/>
            <GalleryPage galleryList={galleryList}/>
        </>
    );
}