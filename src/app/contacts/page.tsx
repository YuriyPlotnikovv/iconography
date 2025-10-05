import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import ContactsPage from '@/components/ContactsPage/ContactsPage';

export const metadata: Metadata = {
    title: 'Контакты | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Контакты',
    },
]

export default function Page(): JSX.Element {
    return (
        <>
            <Heading currentPageTitle={'Контакты'} breadcrumbsList={breadcrumbsList}/>
            <ContactsPage/>
        </>
    );
}