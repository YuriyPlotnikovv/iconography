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
import reviewsListStyles from './ReviewsList.module.scss'

type PhotoItem = { thumb: string; full: string }

type ReviewPhotoProps = {
  photos: PhotoItem[]
  authorName: string
  date: string
}

export default function ReviewPhoto({ photos, authorName, date }: ReviewPhotoProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const lgInstanceRef = useRef<LightGallery | null>(null)

  useEffect(() => {
    if (!containerRef.current || photos.length === 0) return

    lgInstanceRef.current = lightGallery(containerRef.current, {
      dynamic: true,
      dynamicEl: photos.map((photo) => ({
        src: photo.full,
        thumb: photo.thumb,
        subHtml: `<p>${authorName} (${date})</p>`,
      })),
      plugins: [lgThumbnail, lgZoom],
      speed: 400,
      counter: photos.length > 1,
    })

    return () => {
      lgInstanceRef.current?.destroy()
      lgInstanceRef.current = null
    }
  }, [photos, authorName, date])

  const handleClick = (index: number) => {
    lgInstanceRef.current?.openGallery(index)
  }

  return (
    <div className={reviewsListStyles['reviews__item-photo']} ref={containerRef}>
      {photos.map((photo, index) => (
        <button
          key={index}
          type="button"
          className={reviewsListStyles['reviews__item-photo-btn']}
          onClick={() => handleClick(index)}
          aria-label={`Открыть фото ${index + 1}`}
        >
          <Image
            src={photo.thumb}
            alt={`Фото из отзыва — ${authorName}${photos.length > 1 ? `, фото ${index + 1}` : ''}`}
            fill
            sizes="(max-width: 500px) 25vw, (max-width: 1100px) 20vw, 12vw"
            className={reviewsListStyles['reviews__item-photo-img']}
          />
          <span className={reviewsListStyles['reviews__item-photo-overlay']}>
            <svg
              className={reviewsListStyles['reviews__item-photo-overlay-icon']}
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
      ))}
    </div>
  )
}
