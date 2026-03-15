'use client';

import {JSX, useState} from 'react';
import clsx from 'clsx';
import {A11y, Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type {NavigationOptions, PaginationOptions} from 'swiper/types';
import {CardItem} from '@/types/types';

import Link from 'next/link';
import Card from '@/components/Card/Card';
import sliderStyles from '../../../styles/modules/slider.module.scss';

type GallerySliderProps = {
    galleryList: CardItem[];
}

export default function GallerySlider({galleryList}: GallerySliderProps): JSX.Element {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

    return (
        <div className={clsx('container', sliderStyles['slider'])}>
            <div className={sliderStyles['slider__heading']}>
                <h2 className="section__title">
                    Галерея
                </h2>

                <div className={sliderStyles['slider__controls']}>
                    <button ref={setPrevEl}
                            className={clsx(sliderStyles['slider__navigation-item'], sliderStyles['slider__navigation-item--prev'])}
                            aria-label="Предыдущий слайд">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M14.45 21h-1.275L5 12l8.137-9h1.275l-8.137 9 8.175 9Zm-5.175-9 8.175-9h-1.275L8 12l8.137 9h1.276l-8.138-9Z"/>
                        </svg>
                    </button>

                    <div ref={setPaginationEl} className={sliderStyles['slider__pagination']}></div>

                    <button ref={setNextEl}
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
                    slidesPerView={1}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1100: {
                            slidesPerView: 3,
                        }
                    }}
                    spaceBetween={30}
                    loop={true}
                    speed={2000}
                    navigation={{
                        prevEl,
                        nextEl,
                    } as NavigationOptions}
                    pagination={{
                        el: paginationEl,
                        type: 'custom',
                        clickable: true,
                        renderCustom: (swiper, current, total) => current + ' | ' + total
                    } as PaginationOptions}
            >
                {
                    galleryList.map((item: CardItem) => {
                        return (
                            <SwiperSlide className={sliderStyles['slider__item']} key={item.id}>
                                <Card data={item}/>
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>

            <Link className="button button--accent" href="/gallery">Посмотреть ещё</Link>
        </div>
    );
}