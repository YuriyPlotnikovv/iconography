import { JSX } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { CardItem, WorkFromServer } from '@/types/types'
import Card from '@/components/Card/Card'
import inStockStyles from './InStock.module.scss'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

export default async function InStock(): Promise<JSX.Element | null> {
  const worksData: WorkFromServer[] = await fetchCollection<WorkFromServer>('works', {
    filter: { in_stock: true },
    sort: { date: -1 },
  })

  if (!worksData || worksData.length === 0) {
    return null
  }

  const inStockList: CardItem[] = worksData.map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/in-stock/${work.slug || work._id}`,
    image: getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  return (
    <section className={clsx('section', inStockStyles['in-stock'])}>
      <div className="container">
        <h2 className="section__title" data-animate="fade-up">
          Рукописные иконы в наличии
        </h2>

        <ul className={inStockStyles['in-stock__list']}>
          {inStockList.map((work, index) => {
            return (
              <li
                className={inStockStyles['in-stock__item']}
                key={work.id}
                data-animate="fade-up"
                data-stagger={String(index)}
              >
                <Card data={work} />
              </li>
            )
          })}
        </ul>

        <Link className="button button--accent" href="/in-stock">
          Посмотреть ещё
        </Link>
      </div>
    </section>
  )
}
