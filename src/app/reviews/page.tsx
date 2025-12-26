import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, ReviewItem} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import FormReviews from '@/components/Forms/FormReviews/FormReviews';

export const metadata: Metadata = {
    title: 'Отзывы | Иконописная мастерская',
    description: 'Иконописная мастерская - описание',
};

const breadcrumbsList: BreadcrumbItem[] = [
    {
        title: 'Главная',
        url: '/',
    },
    {
        title: 'Отзывы',
    },
];

const reviewsList: ReviewItem[] = [
    {
        id: 1,
        date: '2025-08-14',
        stars: 5,
        name: 'Имя',
        text: 'Отзыв',
    },
    {
        id: 2,
        date: '2025-08-14',
        stars: 5,
        name: 'Имя',
        text: 'Отзыв',
    },
    {
        id: 3,
        date: '2025-08-14',
        stars: 5,
        name: 'Имя',
        text: 'Отзыв',
    },
];

export default function Page(): JSX.Element {
    return (
        <>
            <Heading title={'Отзывы'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <section className="section">
                <div className="container">
                    <h2 className="visually-hidden">
                        Отзывы о нас
                    </h2>

                    <ReviewsList reviewsList={reviewsList}/>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section__title">
                        Оставить отзыв
                    </h2>

                    <FormReviews/>
                </div>
            </section>
        </>
    );
}