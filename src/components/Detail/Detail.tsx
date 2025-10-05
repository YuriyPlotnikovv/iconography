import {JSX} from 'react';
import detailStyles from './Detail.module.scss';
import {SlideItem} from '@/types/types';
import SliderDetail from '@/components/SliderDetail/SliderDetail';
import clsx from 'clsx';

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

export default function Detail(): JSX.Element {
    return (
        <section className={clsx('section', detailStyles['detail'])}>
            <div className={clsx('container', detailStyles['detail__container'])}>
                <div className={detailStyles['detail__content']}>
                    <h2 className="section__title">
                        Заголовок новости
                    </h2>

                    <div className={detailStyles['detail__text']}>
                        <p>Текст новости</p>
                    </div>

                </div>

                <div className={detailStyles['detail__slider']}>
                    <SliderDetail items={slidesList}/>
                </div>
            </div>
        </section>
    );
}