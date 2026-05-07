import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Works from '@/components/Works/Works'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

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

export default async function Page(): Promise<JSX.Element> {
  const title = 'Рукописные иконы в наличии'
  const description =
    '<p>Готовые рукописные иконы, которые можно приобрести без ожидания. Все образы написаны в строгом соответствии с каноном, в древней технологии яичной темперой на деревянной основе с золочением.</p>'

  const worksData: WorkFromServer[] = await fetchCollection<WorkFromServer>('works', {
    filter: { in_stock: true },
    sort: { date: -1 },
  })

  const inStockList: CardItem[] = (worksData || []).map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/in-stock/${work.slug || work._id}`,
    image: getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Works worksList={inStockList} />
    </>
  )
}
