import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Categories from '@/components/Categories/Categories';

export const metadata: Metadata = {
    title: 'Категории икон | Иконописная Артель',
    description: 'Все категории икон, создаваемых в нашей иконописной мастерской',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Категории икон',
    },
];

export default function Page(): JSX.Element {
    const title = 'Категории икон';
    const description = '<p>Выберите интересующую вас категорию икон, чтобы узнать подробнее о каждом направлении нашей иконописной мастерской.</p>';
    
    return (
        <>
            <Heading
                title={title}
                description={description}
                breadcrumbsList={breadcrumbsList}
            />

            <Categories/>
        </>
    );
}
