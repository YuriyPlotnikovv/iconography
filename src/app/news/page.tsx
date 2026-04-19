import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import News from '@/components/News/News'

export const metadata: Metadata = {
  title: 'Новости | Иконописная Артель',
  description: 'Иконописная Артель - описание',
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
  const description = '<p></p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <News />
    </>
  )
}
