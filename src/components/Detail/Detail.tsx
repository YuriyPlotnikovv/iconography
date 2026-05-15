import { JSX } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ImageItem, SlideItem } from '@/types/types'
import { createSanitizedHTML, formatPrice } from '@/functions/functions'
import detailStyles from './Detail.module.scss'
import { getImageUrl } from '@/lib/api-client'
import GalleryBlock from '@/components/GalleryBlock/GalleryBlock'

type DetailProps = {
  title: string
  description: string
  image: ImageItem
  slidesList: SlideItem[]
  price?: string
  size?: string
}

export default function Detail({
  slidesList,
  image,
  title,
  description,
  price,
  size,
}: DetailProps): JSX.Element {
  const src = getImageUrl(image._id, 800, 500)
  const fullSrc = getImageUrl(image._id, 1600, 1000, { mode: 'bestFit' })
  const alt = image.alt ?? title

  return (
    <section className={clsx('section', detailStyles['detail'])}>
      <div className={clsx('container', detailStyles['detail__container'])}>
        <div className={detailStyles['detail__content']} data-animate="fade-up">
          <h2 className="section__title">{title}</h2>

          <div
            className={clsx('block-html', detailStyles['detail__text'])}
            dangerouslySetInnerHTML={createSanitizedHTML(description)}
          />

          {(price || size) && (
            <div className={detailStyles['detail__price-block']}>
              {size && <p className={detailStyles['detail__size']}>Размер: {size}</p>}

              {price && <p className={detailStyles['detail__price']}>{formatPrice(price)}</p>}

              <Link
                href="/order-delivery"
                className={clsx('button', 'button--accent', detailStyles['detail__price-button'])}
              >
                Как заказать?
              </Link>
            </div>
          )}
        </div>

        <GalleryBlock
          slidesList={slidesList}
          imageSrc={src}
          imageFullSrc={fullSrc}
          imageAlt={alt}
        />
      </div>
    </section>
  )
}
