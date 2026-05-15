import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, NewsFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import News from '@/components/News/News'
import Pagination from '@/components/Pagination/Pagination'
import { fetchCollection, fetchCollectionCount, getImageUrl } from '@/lib/api-client'
import { ITEMS_PER_PAGE } from '@/const/const'

export const metadata: Metadata = {
  title: 'Новости | Иконописная Артель',
  description:
    'Новости и события Иконописной Артели. Актуальная информация о новых работах, мастер-классах и жизни нашей иконописной мастерской.',
  openGraph: {
    title: 'Новости | Иконописная Артель',
    description:
      'Новости и события Иконописной Артели. Актуальная информация о новых работах, мастер-классах и жизни нашей иконописной мастерской.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Новости',
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

  const title = 'Новости'
  const description =
    '<p>Следите за новостями нашей артели: завершенные работы, мастер-классы по иконописи и другие события из жизни нашей мастерской.</p>'

  const [newsData, total] = await Promise.all([
    fetchCollection<NewsFromServer>('news', {
      sort: { date: -1 },
      limit: ITEMS_PER_PAGE,
      skip,
    }),
    fetchCollectionCount('news'),
  ])

  const newsList: CardItem[] = (newsData || []).map((news) => ({
    id: news.slug || news._id,
    title: news.title,
    description: news.description,
    href: `/news/${news.slug || news._id}`,
    image: getImageUrl(news.image._id, 600, 500),
    alt: news.image.title || news.title,
  }))

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <News newsList={newsList}>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/news" />
      </News>
    </>
  )
}
