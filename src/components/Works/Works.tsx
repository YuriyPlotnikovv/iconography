import { JSX, ReactNode } from 'react'
import { CardItem } from '@/types/types'
import EmptySection from '@/components/EmptySection/EmptySection'
import Card from '@/components/Card/Card'
import worksStyles from './Works.module.scss'
import clsx from 'clsx'

type WorksProps = {
  worksList: CardItem[]
  children?: ReactNode
}

export default function Works({ worksList, children }: WorksProps): JSX.Element {
  return worksList.length > 0 ? (
    <section className={clsx('section', worksStyles['works'])}>
      <div className="container">
        <h2 className="visually-hidden">Список работ</h2>

        <ul className={worksStyles['works__list']}>
          {worksList.map((work, index) => {
            return (
              <li
                className={worksStyles['works__item']}
                key={work.id}
                data-animate="fade-up"
                data-stagger={String(index % 6)}
              >
                <Card data={work} />
              </li>
            )
          })}
        </ul>

        {children}
      </div>
    </section>
  ) : (
    <EmptySection />
  )
}
