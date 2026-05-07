import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Works from '@/components/Works/Works'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

export const metadata: Metadata = {
  title: 'Наши работы | Иконописная Артель',
  description:
    'Портфолио Иконописной Артели. Выполненные работы: храмовые, семейные, мерные иконы, венчальные пары. Примеры икон различных размеров и сложности.',
  openGraph: {
    title: 'Наши работы | Иконописная Артель',
    description:
      'Портфолио Иконописной Артели. Выполненные работы: храмовые, семейные, мерные иконы, венчальные пары.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Наши работы',
  },
]

export default async function Page(): Promise<JSX.Element> {
  const title = 'Наши работы'
  const description =
    '<p>Ознакомьтесь с портфолио нашей артели. Здесь представлены выполненные заказы: храмовые образа, семейные и именные иконы, венчальные пары. Каждая икона создана с соблюдением канонических традиций.</p>'

  const worksData: WorkFromServer[] = await fetchCollection<WorkFromServer>('works', {
    sort: { date: -1 },
  })

  const worksList: CardItem[] = (worksData || []).map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/works/${work.slug || work._id}`,
    image: getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Works worksList={worksList} />
    </>
  )
}
