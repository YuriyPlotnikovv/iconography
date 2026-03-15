import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, CardItem, WorkFromServer} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Works from '@/components/Works/Works';
import cockpit from '@/lib/CockpitAPI';

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

export default async function Page(): Promise<JSX.Element> {
    const worksData: WorkFromServer[] = await cockpit.getCollection('works', {
        sort: {date: -1}
    });

    const worksList: CardItem[] = worksData.map((work) => ({
        id: work._id,
        title: work.title,
        description: work.description,
        href: `/works/${work._id}`,
        image: cockpit.getImageUrl(work.image._id, 400, 400),
        alt: work.image.title || work.title,
    }));

    return (
        <>
            <Heading title={'Наши работы'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Works worksList={worksList}/>
        </>
    );
}