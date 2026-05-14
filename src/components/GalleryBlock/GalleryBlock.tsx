'use client'

import { JSX, useEffect, useRef } from 'react'
import Image from 'next/image'
import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import type { LightGallery } from 'lightgallery/lightgallery'
import { SlideItem } from '@/types/types'
import GalleryBlockSlider from '@/components/GalleryBlockSlider/GalleryBlockSlider'
import galleryBlockStyles from './GalleryBlock.module.scss'

type GalleryBlockProps = {
  slidesList: SlideItem[]
  imageSrc: string
  imageFullSrc: string
  imageAlt: string
}

export default function GalleryBlock({
  slidesList,
  imageSrc,
  imageFullSrc,
  imageAlt,
}: GalleryBlockProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const lgInstanceRef = useRef<LightGallery | null>(null)

  const hasSlides = slidesList.length > 0

  useEffect(() => {
    if (!containerRef.current) return

    const dynamicEl = hasSlides
      ? slidesList.map((item) => ({ src: item.image, thumb: item.image, alt: item.alt }))
      : [{ src: imageFullSrc, thumb: imageSrc, alt: imageAlt }]

    lgInstanceRef.current = lightGallery(containerRef.current, {
      dynamic: true,
      dynamicEl,
      plugins: [lgThumbnail, lgZoom],
      speed: 400,
      counter: dynamicEl.length > 1,
    })

    return () => {
      lgInstanceRef.current?.destroy()
      lgInstanceRef.current = null
    }
  }, [hasSlides, slidesList, imageSrc, imageFullSrc, imageAlt])

  const handleSlideClick = (index: number) => {
    lgInstanceRef.current?.openGallery(index)
  }

  return (
    <div ref={containerRef} className={galleryBlockStyles['gallery-block__slider-wrapper']}>
      {hasSlides ? (
        <div
          className={galleryBlockStyles['gallery-block__slider']}
          data-animate="scale-in"
          data-stagger="1"
        >
          <GalleryBlockSlider items={slidesList} onSlideClick={handleSlideClick} />
        </div>
      ) : (
        imageSrc && (
          <div
            className={galleryBlockStyles['gallery-block__image-wrapper']}
            data-animate="scale-in"
            data-stagger="1"
          >
            <button
              type="button"
              className={galleryBlockStyles['gallery-block__image-button']}
              onClick={() => handleSlideClick(0)}
              aria-label="Открыть изображение"
            >
              <Image
                className={galleryBlockStyles['gallery-block__image']}
                src={imageSrc}
                sizes="(max-width: 768px) 100vw, 40vw"
                alt={imageAlt}
                fill
              />
              <span className={galleryBlockStyles['gallery-block__image-overlay']}>
                <svg
                  className={galleryBlockStyles['gallery-block__image-overlay-icon']}
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
          </div>
        )
      )}
    </div>
  )
}
