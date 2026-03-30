import type {Metadata} from 'next';
import {JSX} from 'react';
import {notFound} from 'next/navigation';
import {BreadcrumbItem, CategoryFromServer, SlideItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Detail from '@/components/Detail/Detail';
import cockpit from '@/lib/CockpitAPI';

type PageProps = {
    params: Promise<{
        'categories-detail': string;
    }>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {['categories-detail']: categoryId} = await params;

    try {
        const category: CategoryFromServer = await cockpit.getCollectionItem('category', categoryId);

        return {
            title: `${category.title} | Иконописная Артель`,
            description: category.description,
        };
    } catch {
        return {
            title: 'Категория не найдена | Иконописная Артель',
        };
    }
}

export default async function Page({params}: PageProps): Promise<JSX.Element> {
    const {['categories-detail']: categoryId} = await params;

    let category: CategoryFromServer;

    try {
        category = await cockpit.getCollectionItem('category', categoryId);
    } catch {
        notFound();
    }

    const breadcrumbsList: BreadcrumbItem[] = [
        {
            title: 'Главная',
            url: '/',
        },
        {
            title: 'Категории',
            url: '/categories',
        },
        {
            title: category.title,
        },
    ];

    const slidesList: SlideItem[] = category.slider?.map((image) => ({
        id: image._id,
        image: cockpit.getImageUrl(image._id, 800, 800),
        alt: image.title || category.title,
    }));

    return (
        <>
            <Heading breadcrumbsList={breadcrumbsList}/>

            <Detail title={category.title}
                    description={category.description}
                    image={category.image}
                    slidesList={slidesList}
            />
        </>
    );
}