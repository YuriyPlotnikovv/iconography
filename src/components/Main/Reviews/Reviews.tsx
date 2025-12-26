import {JSX} from 'react';
import {ReviewItem} from '@/types/types';
import Link from 'next/link';
import ReviewsList from '@/components/ReviewsList/ReviewsList';

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

export default function Reviews(): JSX.Element {
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