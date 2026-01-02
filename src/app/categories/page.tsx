import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Categories from '@/components/Categories/Categories';

export const metadata: Metadata = {
    title: 'Категории икон | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
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
    return (
        <>
            <Heading title={'Новости'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Categories/>
        </>
    );
}