'use client';

import {JSX, useRef} from 'react';
import clsx from 'clsx';
import {A11y, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type {Swiper as SwiperCore} from 'swiper';
import type {NavigationOptions, PaginationOptions} from 'swiper/types';

import {CardItem} from '@/types/types';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import sliderStyles from '../../styles/modules/slider.module.scss';
import categoriesStyles from './Categories.module.scss';

const categoriesList: CardItem[] = [
    {
        id: 1,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Описание категории',
        href: '/category-detail',
        image: '/img/cover.jpg',
        alt: 'Подпись к фото',
    },
];

export default function Categories(): JSX.Element {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);

    const onBeforeInit = (swiper: SwiperCore) => {
        if (prevRef.current && nextRef.current && swiper.params.navigation) {
            (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
            (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
        }

        if (paginationRef.current && swiper.params.pagination) {
            (swiper.params.pagination as PaginationOptions).el = paginationRef.current;
            (swiper.params.pagination as PaginationOptions).type = 'custom';
            (swiper.params.pagination as PaginationOptions).clickable = true;
            (swiper.params.pagination as PaginationOptions).renderCustom = (swiper, current, total) => current + ' | ' + total;
        }
    };

    return (
        <section className={clsx('section', categoriesStyles['categories'])} id="categories">
            <div className={clsx('container', sliderStyles['slider'])}>
                <div className={sliderStyles['slider__heading']}>
                    <h2 className="section__title">
                        Категории икон
                    </h2>

                    <div className={sliderStyles['slider__controls']}>
                        <button ref={prevRef}
                                className={clsx(sliderStyles['slider__navigation-item'], sliderStyles['slider__navigation-item--prev'])}
                                aria-label="Предыдущий слайд">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M14.45 21h-1.275L5 12l8.137-9h1.275l-8.137 9 8.175 9Zm-5.175-9 8.175-9h-1.275L8 12l8.137 9h1.276l-8.138-9Z"/>
                            </svg>
                        </button>

                        <div ref={paginationRef} className={sliderStyles['slider__pagination']}></div>

                        <button ref={nextRef}
                                className={clsx(sliderStyles['slider__navigation-item'], sliderStyles['slider__navigation-item--next'])}
                                aria-label="Следующий слайд">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fillRule="evenodd"
                                      d="M17.725 12 9.587 3h1.275L19 12l-8.138 9H9.587l8.138-9ZM6.587 21h1.275L16 12 7.862 3H6.587l8.138 9-8.138 9Z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <Swiper className={sliderStyles['slider__list']}
                        modules={[Navigation, Pagination, A11y]}
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        speed={2000}
                        onBeforeInit={onBeforeInit}
                >
                    {
                        categoriesList.map((category) => {
                            return (
                                <SwiperSlide className={sliderStyles['slider__item']} key={category.id}>
                                    <Card data={category}/>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>

                <Link className="button button--accent" href="/categories">Посмотреть ещё</Link>
            </div>
        </section>
    );
}