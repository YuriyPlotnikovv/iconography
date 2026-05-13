import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, CategoryFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Categories from '@/components/Categories/Categories'
import Pagination from '@/components/Pagination/Pagination'
import { fetchCollection, fetchCollectionCount, getImageUrl } from '@/lib/api-client'
import { ITEMS_PER_PAGE } from '@/const/const'

export const metadata: Metadata = {
  title: 'Категории икон | Иконописная Артель',
  description: 'Все категории икон, создаваемых в нашей иконописной мастерской',
  openGraph: {
    title: 'Категории икон | Иконописная Артель',
    description: 'Все категории икон, создаваемых в нашей иконописной мастерской',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Категории икон',
  },
]

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<JSX.Element> {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1') || 1)
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const title = 'Категории икон'
  const description =
    '<p>Выберите интересующую вас категорию икон, чтобы узнать подробнее о каждом направлении нашей иконописной мастерской.</p>'

  const [categoriesData, total] = await Promise.all([
    fetchCollection<CategoryFromServer>('category', {
      sort: { sort: 1 },
      limit: ITEMS_PER_PAGE,
      skip,
    }),
    fetchCollectionCount('category'),
  ])

  const categoriesList: CardItem[] = (categoriesData || []).map((category) => ({
    id: category.slug || category._id,
    title: category.title,
    description: category.description,
    href: `/categories/${category.slug || category._id}`,
    image: getImageUrl(category.image._id, 600, 500),
    alt: category.image.title || category.title,
  }))

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Categories categoriesList={categoriesList}>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/categories" />
      </Categories>
    </>
  )
}
