'use client';

import {JSX, useRef} from 'react';
import clsx from 'clsx';
import {Navigation, Pagination, A11y, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type {Swiper as SwiperCore} from 'swiper';
import type {NavigationOptions, PaginationOptions} from 'swiper/types';

import {CardItem} from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import sliderStyles from '../../styles/modules/slider.module.scss';
import stylesSliderMain from './SliderMain.module.scss';

const slidesList: CardItem[] = [
    {
        id: 1,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        title: 'Заголовок слайда',
        text: 'Текст слайда',
        href: './news-detail.html'
    },
    {
        id: 2,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        title: 'Заголовок слайда',
        text: 'Текст слайда',
        href: './news-detail.html'
    },
    {
        id: 3,
        image: '/img/cover.jpg',
        alt: 'Обложка слайда',
        title: 'Заголовок слайда',
        text: 'Текст слайда',
        href: './news-detail.html'
    },
];

export default function SliderMain(): JSX.Element {
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
        <section className={clsx('section', sliderStyles['slider'], stylesSliderMain['slider-main'])}>
            <h2 className="visually-hidden">
                Последние поступления
            </h2>

            <Swiper className={sliderStyles['slider__list']}
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    loop={true}
                    speed={2500}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onBeforeInit={onBeforeInit}
            >
                {slidesList.map((slide) => {
                    return (
                        <SwiperSlide className={clsx(sliderStyles['slider__item'], stylesSliderMain['slider-main__item'])}
                                     key={slide.id}>
                            <Image className={stylesSliderMain['slider-main__item-image']} src={slide.image}
                                   alt={slide.alt} fill/>

                            <div className={stylesSliderMain['slider-main__item-content']}>
                                <h3 className={stylesSliderMain['slider-main__item-title']}>
                                    {slide.title}
                                </h3>

                                <div className={stylesSliderMain['slider-main__item-text']}>
                                    {slide.text}
                                </div>

                                <Link
                                    className={clsx(stylesSliderMain['slider-main__item-button'], 'button', 'button--arrow')}
                                    href={slide.href}>Подробнее</Link>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div ref={paginationRef} className={clsx(sliderStyles['slider__pagination'], stylesSliderMain['slider-main__pagination'])}></div>

                <button ref={prevRef}
                        className={clsx(sliderStyles['slider__navigation-item'], stylesSliderMain['slider-main__navigation-item'], stylesSliderMain['slider-main__navigation-item--prev'])}
                        aria-label="Предыдущий слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                              d="M14.45 21h-1.275L5 12l8.137-9h1.275l-8.137 9 8.175 9Zm-5.175-9 8.175-9h-1.275L8 12l8.137 9h1.276l-8.138-9Z"/>
                    </svg>
                </button>

                <button ref={nextRef}
                        className={clsx(sliderStyles['slider__navigation-item'], stylesSliderMain['slider-main__navigation-item'], stylesSliderMain['slider-main__navigation-item--next'])}
                        aria-label="Следующий слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                              d="M17.725 12 9.587 3h1.275L19 12l-8.138 9H9.587l8.138-9ZM6.587 21h1.275L16 12 7.862 3H6.587l8.138 9-8.138 9Z"/>
                    </svg>
                </button>
            </Swiper>
        </section>
    );
}