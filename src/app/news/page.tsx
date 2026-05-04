import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import News from '@/components/News/News'

export const metadata: Metadata = {
  title: 'Новости | Иконописная Артель',
  description: 'Новости и события Иконописной Артели. Актуальная информация о новых работах, мастер-классах и жизни нашей иконописной мастерской.',
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

export default function Page(): JSX.Element {
  const title = 'Новости'
  const description = '<p>Следите за новостями нашей артели: завершенные работы, мастер-классы по иконописи и другие события из жизни нашей мастерской.</p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <News />
    </>
  )
}
