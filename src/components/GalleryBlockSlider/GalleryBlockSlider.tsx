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
import galleryBlockSliderStyles from './GalleryBlockSlider.module.scss'

type GalleryBlockSliderProps = {
  items: SlideItem[]
  onSlideClick?: (index: number) => void
}

export default function GalleryBlockSlider({
  items,
  onSlideClick,
}: GalleryBlockSliderProps): JSX.Element {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null)

  return (
    <div className={clsx(sliderStyles['slider'], galleryBlockSliderStyles['slider-detail'])}>
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
        {items.map((item, index) => {
          return (
            <SwiperSlide
              className={clsx(
                sliderStyles['slider__item'],
                galleryBlockSliderStyles['slider-detail__item'],
              )}
              key={item.id + index}
            >
              {onSlideClick ? (
                <button
                  type="button"
                  className={galleryBlockSliderStyles['slider-detail__item-btn']}
                  onClick={() => onSlideClick(index)}
                  aria-label={`Открыть изображение ${index + 1}`}
                >
                  <Image
                    className={galleryBlockSliderStyles['slider-detail__item-image']}
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className={galleryBlockSliderStyles['slider-detail__item-overlay']}>
                    <svg
                      className={galleryBlockSliderStyles['slider-detail__item-overlay-icon']}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </button>
              ) : (
                <Image
                  className={galleryBlockSliderStyles['slider-detail__item-image']}
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </SwiperSlide>
          )
        })}

        <div
          ref={setPaginationEl}
          className={clsx(
            sliderStyles['slider__pagination'],
            galleryBlockSliderStyles['slider-detail__pagination'],
          )}
        ></div>

        <button
          ref={setPrevEl}
          className={clsx(
            sliderStyles['slider__navigation-item'],
            galleryBlockSliderStyles['slider-detail__navigation-item'],
            galleryBlockSliderStyles['slider-detail__navigation-item--prev'],
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
            galleryBlockSliderStyles['slider-detail__navigation-item'],
            galleryBlockSliderStyles['slider-detail__navigation-item--next'],
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
