import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Works from '@/components/Works/Works'
import cockpit from '@/lib/CockpitAPI'

export const metadata: Metadata = {
  title: 'Наши работы | Иконописная Артель',
  description: 'Иконописная Артель - описание',
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
  const description = '<p></p>'

  const worksData: WorkFromServer[] | null = await cockpit.getCollection('works', {
    sort: { date: -1 },
  })

  const worksList: CardItem[] = (worksData || []).map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/works/${work.slug || work._id}`,
    image: cockpit.getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Works worksList={worksList} />
    </>
  )
}
