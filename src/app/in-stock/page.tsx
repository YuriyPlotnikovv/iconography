import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, CardItem, WorkFromServer} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Works from '@/components/Works/Works';
import cockpit from '@/lib/CockpitAPI';

export const metadata: Metadata = {
    title: 'Рукописные иконы в наличии | Иконописная Артель',
    description: 'Иконописная Артель - описание',
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

export default async function Page(): Promise<JSX.Element> {
    const title = 'Рукописные иконы в наличии';
    const description = '<p></p>';

    const worksData: WorkFromServer[] | null = await cockpit.getCollection('works', {
        filter: {in_stock: true},
        sort: {date: -1}
    });

    const inStockList: CardItem[] = (worksData || []).map((work) => ({
        id: work._id,
        title: work.title,
        description: work.description,
        href: `/in-stock/${work._id}`,
        image: cockpit.getImageUrl(work.image._id, 400, 400),
        alt: work.image.title || work.title,
    }));

    return (
        <>
            <Heading title={title}
                     description={description}
                     breadcrumbsList={breadcrumbsList}
            />

            <Works worksList={inStockList}/>
        </>
    );
}