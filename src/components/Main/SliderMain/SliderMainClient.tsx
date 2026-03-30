"use client";

import {JSX, useState} from 'react';
import clsx from 'clsx';
import {Navigation, Pagination, A11y, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type {NavigationOptions, PaginationOptions} from 'swiper/types';
import {CardItem} from '@/types/types';

import Image from 'next/image';
import Link from 'next/link';
import sliderStyles from '../../../styles/modules/slider.module.scss';
import stylesSliderMain from './SliderMain.module.scss';
import {createSanitizedHTML} from '@/functions/functions';

type SliderMainClientProps = {
    slidesList: CardItem[];
}

export default function SliderMainClient({slidesList}: SliderMainClientProps): JSX.Element {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
    const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

    return (
        <section className={clsx('section', sliderStyles['slider'], stylesSliderMain['slider-main'])}>
            <h2 className="visually-hidden">
                Новости и акции
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

                                <div className={clsx('block-html', stylesSliderMain['slider-main__item-text'])}
                                     dangerouslySetInnerHTML={createSanitizedHTML(slide.description)}
                                />

                                <Link className={clsx(stylesSliderMain['slider-main__item-button'], 'button', 'button--arrow')}
                                    href={slide.href}
                                >
                                    Подробнее
                                </Link>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div ref={setPaginationEl} className={clsx(sliderStyles['slider__pagination'], stylesSliderMain['slider-main__pagination'])}></div>

                <button ref={setPrevEl}
                        className={clsx(sliderStyles['slider__navigation-item'], stylesSliderMain['slider-main__navigation-item'], stylesSliderMain['slider-main__navigation-item--prev'])}
                        aria-label="Предыдущий слайд">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fillRule="evenodd"
                              d="M14.45 21h-1.275L5 12l8.137-9h1.275l-8.137 9 8.175 9Zm-5.175-9 8.175-9h-1.275L8 12l8.137 9h1.276l-8.138-9Z"/>
                    </svg>
                </button>

                <button ref={setNextEl}
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


