import {JSX} from 'react';
import Link from 'next/link';

import {ReviewFromServer, ReviewItem} from '@/types/types';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import cockpit from '@/lib/CockpitAPI';

export default async function Reviews(): Promise<JSX.Element | null> {
    const reviewsData: ReviewFromServer[] = await cockpit.getCollection('reviews', {
        sort: {date: -1},
        limit: 6
    });

    if (!reviewsData || reviewsData.length === 0) {
        return null;
    }

    const reviewsList: ReviewItem[] = reviewsData.map((review) => ({
        id: review._id,
        date: review.date,
        stars: review.stars,
        name: review.name,
        review: review.review,
    }));

    return (
        <section className="section">
            <div className="container">
                <h2 className="section__title">
                    Отзывы
                </h2>

                <ReviewsList reviewsList={reviewsList}/>

                <Link className="button button--accent" href="/reviews">Посмотреть ещё</Link>
            </div>
        </section>
    );
}