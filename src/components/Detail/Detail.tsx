import { JSX } from 'react'
import clsx from 'clsx'
import { ImageItem, SlideItem } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'
import SliderDetail from '@/components/SliderDetail/SliderDetail'
import detailStyles from './Detail.module.scss'
import { getImageUrl } from '@/lib/api-client'
import Image from 'next/image'

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
  const alt = image.alt ?? title

  return (
    <section className={clsx('section', detailStyles['detail'])}>
      <div className={clsx('container', detailStyles['detail__container'])}>
        <div className={detailStyles['detail__content']}>
          <h2 className="section__title">{title}</h2>

          <div
            className={clsx('block-html', detailStyles['detail__text'])}
            dangerouslySetInnerHTML={createSanitizedHTML(description)}
          />
        </div>

        {slidesList.length > 0 && (
          <div className={detailStyles['detail__slider']}>
            <SliderDetail items={slidesList} />
          </div>
        )}

        {slidesList.length === 0 && image && (
          <div className={detailStyles['detail__image-wrapper']}>
            <Image
              className={detailStyles['detail__image']}
              src={src}
              sizes="(max-width: 768px) 100vw, 40vw"
              alt={alt}
              fill
            />
          </div>
        )}
      </div>
    </section>
  )
}
