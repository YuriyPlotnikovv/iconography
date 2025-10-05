import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
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
]

export default function Page(): JSX.Element {
    return (
        <>
            <Heading currentPageTitle={'Заголовок новости'} breadcrumbsList={breadcrumbsList} />
            <Detail/>
        </>
    );
}