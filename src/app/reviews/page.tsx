import type {Metadata} from 'next';
import {JSX} from 'react';
import {BreadcrumbItem, ReviewItem, ReviewFromServer} from '@/types/types';
import Heading from '@/components/Heading/Heading';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import FormReviews from '@/components/Forms/FormReviews/FormReviews';
import cockpit from '@/lib/CockpitAPI';

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

export default async function Page(): Promise<JSX.Element> {
    const reviewsData: ReviewFromServer[] = await cockpit.getCollection('reviews');

    const reviewsList: ReviewItem[] = reviewsData.map((review) => ({
        id: review._id,
        date: review.date,
        stars: review.stars,
        name: review.name,
        text: review.text,
    }));

    return (
        <>
            <Heading title={'Отзывы'} description={'<p>Подробное описание раздела</p>'}
                     breadcrumbsList={breadcrumbsList}/>

            <section className="section">
                <div className="container">
                    <h2 className="visually-hidden">
                        Отзывы о нас
                    </h2>

                    {reviewsList.length > 0 && <ReviewsList reviewsList={reviewsList}/>}
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