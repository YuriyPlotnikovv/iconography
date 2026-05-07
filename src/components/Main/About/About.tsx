import { JSX } from 'react'
import aboutStyles from './About.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { fetchSingleton, getImageUrl } from '@/lib/api-client'
import { MainInfo } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'

export default async function About(): Promise<JSX.Element | null> {
  const mainInfo: MainInfo | null = await fetchSingleton('maininfo')

  if (!mainInfo) {
    return null
  }

  const title = mainInfo.title
  const description = mainInfo.description
  const image = mainInfo.image ? getImageUrl(mainInfo.image._id, 800, 500) : ''
  const alt = mainInfo.image?.alt ?? mainInfo.title

  return (
    <section className={clsx('section', aboutStyles['about'])}>
      <div className={clsx('container', aboutStyles['about__container'])}>
        <h2 className={aboutStyles['about__title']}>{title}</h2>

        <div className={aboutStyles['about__image-wrapper']}>
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
          dangerouslySetInnerHTML={createSanitizedHTML(description)}
        />

        <Link className="button button--accent" href="/about">
          Подробнее
        </Link>
      </div>
    </section>
  )
}
