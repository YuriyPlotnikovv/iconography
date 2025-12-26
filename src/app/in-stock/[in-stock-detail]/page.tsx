import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, SlideItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import Detail from '@/components/Detail/Detail';
import Master from '@/components/Master/Master';
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation';

export const metadata: Metadata = {
    title: 'Рукописные иконы в наличии | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

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
        title: 'Название работы',
    },
];

const slidesList: SlideItem[] = [
    {
        id: 1,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: './news-detail.html'
    },
    {
        id: 2,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: './news-detail.html'
    },
    {
        id: 3,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        href: './news-detail.html'
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Название работы'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <Detail slidesList={slidesList} title={'Название работы'} description={'<p>Описание работы</p>'}/>

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