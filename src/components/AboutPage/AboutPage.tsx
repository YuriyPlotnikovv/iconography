import { JSX } from 'react'
import clsx from 'clsx'
import { ImageItem, SlideItem } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'
import SliderDetail from '@/components/SliderDetail/SliderDetail'
import aboutPageStyles from './AboutPage.module.scss'
import cockpit from '@/lib/CockpitAPI'
import Image from 'next/image'
import EmptySection from '@/components/EmptySection/EmptySection'

type AboutPageProps = {
  title: string
  description: string
  image: ImageItem
  slider: ImageItem[]
}

export default async function AboutPage(): Promise<JSX.Element> {
  const about: AboutPageProps | null = await cockpit.getSingleItem('about')

  if (!about) return <EmptySection />

  const title = about.title ?? ''
  const description = about.description ?? ''

  const slidesList: SlideItem[] = about.slider?.map((image) => ({
    id: image._id,
    image: cockpit.getImageUrl(image._id, 800, 800),
    alt: image.title || about.title,
  }))

  const imageSrc = about.image ? cockpit.getImageUrl(about.image._id, 800, 500) : ''
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

        {slidesList.length > 0 && (
          <div
            className={aboutPageStyles['about__slider']}
            data-animate="scale-in"
            data-stagger="1"
          >
            <SliderDetail items={slidesList} />
          </div>
        )}

        {slidesList.length === 0 && imageSrc && (
          <div
            className={aboutPageStyles['about__image-wrapper']}
            data-animate="scale-in"
            data-stagger="1"
          >
            <Image
              className={aboutPageStyles['about__image']}
              src={imageSrc}
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
