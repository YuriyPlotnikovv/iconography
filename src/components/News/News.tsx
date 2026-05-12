import { JSX, ReactNode } from 'react'
import newsStyles from './News.module.scss'
import { CardItem } from '@/types/types'
import EmptySection from '@/components/EmptySection/EmptySection'
import Card from '@/components/Card/Card'
import clsx from 'clsx'

type NewsProps = {
  newsList: CardItem[]
  children?: ReactNode
}

export default function News({ newsList, children }: NewsProps): JSX.Element {
  if (!newsList || newsList.length === 0) {
    return <EmptySection />
  }

  return (
    <section className={clsx('section', newsStyles['news'])}>
      <div className="container">
        <h2 className="visually-hidden">Список новостей</h2>

        <ul className={newsStyles['news__list']}>
          {newsList.map((news, index) => {
            return (
              <li
                className={newsStyles['news__item']}
                key={news.id}
                data-animate="fade-up"
                data-stagger={String(index % 6)}
              >
                <Card data={news} />
              </li>
            )
          })}
        </ul>

        {children}
      </div>
    </section>
  )
}
