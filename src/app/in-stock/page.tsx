import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Works from '@/components/Works/Works'
import Pagination from '@/components/Pagination/Pagination'
import { fetchCollection, fetchCollectionCount, getImageUrl } from '@/lib/api-client'
import { ITEMS_PER_PAGE } from '@/const/const'

export const metadata: Metadata = {
  title: 'Рукописные иконы в наличии | Иконописная Артель',
  description:
    'Готовые рукописные иконы в наличии. Каноничные образы, написанные яичной темперой на деревянной основе. Возможность приобретения без ожидания.',
  openGraph: {
    title: 'Рукописные иконы в наличии | Иконописная Артель',
    description:
      'Готовые рукописные иконы в наличии. Каноничные образы, написанные яичной темперой на деревянной основе.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Рукописные иконы в наличии',
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

  const title = 'Рукописные иконы в наличии'
  const description =
    '<p>Готовые рукописные иконы, которые можно приобрести без ожидания. Все образы написаны в строгом соответствии с каноном, в древней технологии яичной темперой на деревянной основе с золочением.</p>'

  const inStockFilter = { in_stock: true }

  const [worksData, total] = await Promise.all([
    fetchCollection<WorkFromServer>('works', {
      filter: inStockFilter,
      sort: { date: -1 },
      limit: ITEMS_PER_PAGE,
      skip,
    }),
    fetchCollectionCount('works', { filter: inStockFilter }),
  ])

  const inStockList: CardItem[] = (worksData || []).map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/in-stock/${work.slug || work._id}`,
    image: getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Works worksList={inStockList}>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/in-stock" />
      </Works>
    </>
  )
}
