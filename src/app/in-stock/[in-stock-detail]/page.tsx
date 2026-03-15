import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, SlideItem, WorkFromServer} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Detail from '@/components/Detail/Detail';
import Master from '@/components/Master/Master';
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation';
import cockpit from '@/lib/CockpitAPI';

type PageProps = {
    params: Promise<{
        'in-stock-detail': string;
    }>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {['in-stock-detail']: workId} = await params;
    const work: WorkFromServer = await cockpit.getCollectionItem('works', workId);

    return {
        title: `${work.title} | Иконописная мастерская`,
        description: work.description || 'Иконописная мастерская - описание',
    };
}

export async function generateStaticParams() {
    const works: WorkFromServer[] = await cockpit.getCollection('works', {
        filter: {instock: true}
    });

    return works.map((work) => ({
        'in-stock-detail': work._id,
    }));
}

export default async function Page({params}: PageProps): Promise<JSX.Element> {
    const {['in-stock-detail']: workId} = await params;
    const work: WorkFromServer = await cockpit.getCollectionItem('works', workId);

    const breadcrumbsList: BreadcrumbItem[] = [
        {
            title: 'Главная',
            url: '/',
        },
        {
            title: 'Рукописные иконы в наличии',
            url: '/in-stock',
        },
        {
            title: work.title,
        },
    ];

    const slidesList: SlideItem[] = work.slider?.map((image, index) => ({
        id: index + 1,
        image: cockpit.getImageUrl(image._id, 800, 800),
        alt: image.title || work.title,
    })) || [];

    return (
        <>
            <Heading breadcrumbsList={breadcrumbsList}/>

            <Detail slidesList={slidesList} title={work.title} description={work.description}/>

            <Master/>

            <section className="section">
                <div className="container">
                    <h2 className="section__title">
                        Расчёт стоимости заказа работы
                    </h2>

                    <FormCalculation/>
                </div>
            </section>
        </>
    );
}