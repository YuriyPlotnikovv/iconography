import { JSX } from 'react'
import clsx from 'clsx'
import { AboutFromServer, SlideItem } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'
import aboutPageStyles from './AboutPage.module.scss'
import { fetchSingleton, getImageUrl } from '@/lib/api-client'
import EmptySection from '@/components/EmptySection/EmptySection'
import GalleryBlock from '@/components/GalleryBlock/GalleryBlock'

export default async function AboutPage(): Promise<JSX.Element> {
  const about: AboutFromServer | null = await fetchSingleton<AboutFromServer>('about')

  if (!about) return <EmptySection />

  const title = about.title ?? ''
  const description = about.description ?? ''

  const slidesList: SlideItem[] = about.slider?.map((image) => ({
    id: image._id,
    image: getImageUrl(image._id, 800, 500),
    alt: image.title || about.title,
  }))

  const imageSrc = about.image ? getImageUrl(about.image._id, 800, 500) : ''
  const imageFullSrc = about.image
    ? getImageUrl(about.image._id, 1600, 1000, { mode: 'bestFit' })
    : ''
  const alt = about.image?.alt ?? title

  return (
    <section className={clsx('section', aboutPageStyles['about'])}>
      <div className={clsx('container', aboutPageStyles['about__container'])}>
        <div className={aboutPageStyles['about__content']} data-animate="fade-up">
          <h2 className="visually-hidden">{title}</h2>

          <div
            className={clsx('block-html', aboutPageStyles['about__text'])}
            dangerouslySetInnerHTML={createSanitizedHTML(description)}
          />
        </div>

        <GalleryBlock
          slidesList={slidesList}
          imageSrc={imageSrc}
          imageFullSrc={imageFullSrc}
          imageAlt={alt}
        />
      </div>
    </section>
  )
}
