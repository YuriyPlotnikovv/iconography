import { JSX } from 'react'
import clsx from 'clsx'
import { ImageItem, SlideItem } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'
import detailStyles from './Detail.module.scss'
import { getImageUrl } from '@/lib/api-client'
import GalleryBlock from '@/components/GalleryBlock/GalleryBlock'

type DetailProps = {
  title: string
  description: string
  image: ImageItem
  slidesList: SlideItem[]
}

export default function Detail({
  slidesList,
  image,
  title,
  description,
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
