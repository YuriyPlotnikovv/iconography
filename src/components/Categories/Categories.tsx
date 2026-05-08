import { JSX } from 'react'
import clsx from 'clsx'
import { CardItem, CategoryFromServer } from '@/types/types'
import Card from '@/components/Card/Card'
import categoriesStyles from './Categories.module.scss'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

export default async function Categories(): Promise<JSX.Element | null> {
  const categoriesData: CategoryFromServer[] = await fetchCollection<CategoryFromServer>('category', {
    sort: { sort: 1 },
  })

  if (!categoriesData || categoriesData.length === 0) {
    return null
  }

  const categoriesList: CardItem[] = categoriesData.map((category) => ({
    id: category.slug || category._id,
    title: category.title,
    description: category.description,
    href: `/categories/${category.slug || category._id}`,
    image: getImageUrl(category.image._id, 400, 400),
    alt: category.image.title || category.title,
  }))

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
      </div>
    </section>
  )
}
