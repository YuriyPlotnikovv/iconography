import { JSX } from 'react'
import clsx from 'clsx'

import { CardItem, CategoryFromServer } from '@/types/types'

import CategoriesSlider from './CategoriesSlider'
import categoriesStyles from './Categories.module.scss'
import cockpit from '@/lib/CockpitAPI'

export default async function Categories(): Promise<JSX.Element | null> {
  const categoriesData: CategoryFromServer[] = await cockpit.getCollection('category', {
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
    image: cockpit.getImageUrl(category.image._id, 400, 400),
    alt: category.image.title || category.title,
  }))

  return (
    <section className={clsx('section', categoriesStyles['categories'])} id="categories">
      <CategoriesSlider categoriesList={categoriesList} />
    </section>
  )
}
