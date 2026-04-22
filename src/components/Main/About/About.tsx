import { JSX } from 'react'
import aboutStyles from './About.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import cockpit from '@/lib/CockpitAPI'
import { MainInfo } from '@/types/types'
import { createSanitizedHTML } from '@/functions/functions'

export default async function About(): Promise<JSX.Element | null> {
  const mainInfo: MainInfo | null = await cockpit.getSingleItem('maininfo')

  if (!mainInfo) {
    return null
  }

  const title = mainInfo.title
  const description = mainInfo.description
  const image = mainInfo.image
    ? cockpit.getImageUrl(mainInfo.image._id, 800, 500)
    : ''
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
      </div>
    </section>
  )
}
