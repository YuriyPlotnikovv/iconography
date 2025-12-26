import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import News from '@/components/News/News';

export const metadata: Metadata = {
    title: 'Новости | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Новости',
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Новости'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <News/>
        </>
    );
}