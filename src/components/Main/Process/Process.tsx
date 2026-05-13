import { JSX } from 'react'
import processStyles from './Process.module.scss'
import { ProcessFromServer } from '@/types/types'
import Image from 'next/image'
import clsx from 'clsx'
import { fetchCollection, getImageUrl } from '@/lib/api-client'
import { createSanitizedHTML } from '@/functions/functions'

export default async function Process(): Promise<JSX.Element | null> {
  const processList: ProcessFromServer[] = await fetchCollection<ProcessFromServer>(
    'createprocess',
    {
      sort: { sort: 1 },
    },
  )

  if (!processList || processList.length === 0) {
    return null
  }

  return (
    <section className={clsx('section', processStyles['process'])} id="process">
      <div className="container">
        <h2 className="section__title" data-animate="fade-up">
          Процесс сотворения образа
        </h2>

        <ul className={processStyles['process__list']}>
          {processList.map((process, index) => {
            const title = process.title
            const description = process.description
            const image = getImageUrl(process.image._id, 800, 600)
            const alt = process.alt ?? process.title

            return (
              <li
                className={processStyles['process__item']}
                key={process._id}
                data-animate={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                <Image
                  className={processStyles['process__item-image']}
                  src={image}
                  alt={alt}
                  width={800}
                  height={600}
                />

                <h3 className={processStyles['process__item-title']}>{title}</h3>

                {description && (
                  <div
                    className={clsx('block-html', processStyles['process__item-text'])}
                    dangerouslySetInnerHTML={createSanitizedHTML(description)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
