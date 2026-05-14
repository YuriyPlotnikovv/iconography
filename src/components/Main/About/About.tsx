import { JSX } from 'react'
import aboutStyles from './About.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { fetchSingleton, getImageUrl } from '@/lib/api-client'
import { AboutFromServer, MainInfoFromServer } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'

export default async function About(): Promise<JSX.Element | null> {
  const [mainInfo, about] = await Promise.all([
    fetchSingleton<MainInfoFromServer>('maininfo'),
    fetchSingleton<AboutFromServer>('about'),
  ])

  if (!mainInfo || !about) {
    return null
  }

  const title = mainInfo.title
  const description = about.preview ?? ''
  const image = about.image ? getImageUrl(about.image._id, 800, 500) : ''
  const alt = about.image?.alt ?? title

  return (
    <section className={clsx('section', aboutStyles['about'])}>
      <div className={clsx('container', aboutStyles['about__container'])}>
        <h2 className={aboutStyles['about__title']} data-animate="fade-up">
          {title}
        </h2>

        <div
          className={aboutStyles['about__image-wrapper']}
          data-animate="scale-in"
          data-stagger="1"
        >
          <Image
            className={aboutStyles['about__image']}
            src={image}
            sizes="(max-width: 768px) 100vw, 40vw"
            alt={alt}
            fill
          />
        </div>

        <div
          className={clsx('block-html', aboutStyles['about__text'])}
          data-animate="fade-up"
          data-stagger="2"
          dangerouslySetInnerHTML={createSanitizedHTML(description)}
        />

        <Link className="button button--accent" href="/about">
          Подробнее
        </Link>
      </div>
    </section>
  )
}
