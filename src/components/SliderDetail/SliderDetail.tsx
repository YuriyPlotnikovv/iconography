'use client'

import { JSX, useState } from 'react'
import clsx from 'clsx'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import type { NavigationOptions, PaginationOptions } from 'swiper/types'
import { SlideItem } from '@/types/types'

import Image from 'next/image'
import sliderStyles from '../../styles/modules/slider.module.scss'
import sliderDetailStyles from './SliderDetail.module.scss'

type SliderDetailProps = {
  items: SlideItem[]
}

export default function SliderDetail({ items }: SliderDetailProps): JSX.Element {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null)

  return (
    <div className={clsx(sliderStyles['slider'], sliderDetailStyles['slider-detail'])}>
      <Swiper
        className={sliderStyles['slider__list']}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop={true}
        speed={2500}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={
          {
            prevEl,
            nextEl,
          } as NavigationOptions
        }
        pagination={
          {
            el: paginationEl,
            type: 'custom',
            clickable: true,
            renderCustom: (swiper, current, total) => current + ' | ' + total,
          } as PaginationOptions
        }
      >
        {items.map((item) => {
          return (
            <SwiperSlide
              className={clsx(
                sliderStyles['slider__item'],
                sliderDetailStyles['slider-detail__item'],
              )}
              key={item.id}
            >
              <Image
                className={sliderDetailStyles['slider-detail__item-image']}
                src={item.image}
                alt={item.alt}
                fill
              />
            </SwiperSlide>
          )
        })}

        <div
          ref={setPaginationEl}
          className={clsx(
            sliderStyles['slider__pagination'],
            sliderDetailStyles['slider-detail__pagination'],
          )}
        ></div>

        <button
          ref={setPrevEl}
          className={clsx(
            sliderStyles['slider__navigation-item'],
            sliderDetailStyles['slider-detail__navigation-item'],
            sliderDetailStyles['slider-detail__navigation-item--prev'],
          )}
          aria-label="Предыдущий слайд"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M14.45 21h-1.275L5 12l8.137-9h1.275l-8.137 9 8.175 9Zm-5.175-9 8.175-9h-1.275L8 12l8.137 9h1.276l-8.138-9Z"
            />
          </svg>
        </button>

        <button
          ref={setNextEl}
          className={clsx(
            sliderStyles['slider__navigation-item'],
            sliderDetailStyles['slider-detail__navigation-item'],
            sliderDetailStyles['slider-detail__navigation-item--next'],
          )}
          aria-label="Следующий слайд"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M17.725 12 9.587 3h1.275L19 12l-8.138 9H9.587l8.138-9ZM6.587 21h1.275L16 12 7.862 3H6.587l8.138 9-8.138 9Z"
            />
          </svg>
        </button>
      </Swiper>
    </div>
  )
}
