import { JSX, ReactNode } from 'react'
import clsx from 'clsx'
import { CardItem } from '@/types/types'
import Card from '@/components/Card/Card'
import categoriesStyles from './Categories.module.scss'

type CategoriesProps = {
  categoriesList: CardItem[]
  children?: ReactNode
}

export default function Categories({
  categoriesList,
  children,
}: CategoriesProps): JSX.Element | null {
  if (!categoriesList || categoriesList.length === 0) {
    return null
  }

  return (
    <section className={clsx('section', categoriesStyles['categories'])}>
      <div className="container">
        <h2 className="visually-hidden">Категории икон</h2>

        <ul className={categoriesStyles['categories__list']}>
          {categoriesList.map((category, index) => {
            return (
              <li
                className={categoriesStyles['categories__item']}
                key={category.id}
                data-animate="fade-up"
                data-stagger={String(index % 6)}
              >
                <Card data={category} />
              </li>
            )
          })}
        </ul>

        {children}
      </div>
    </section>
  )
}
