import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import AboutPage from '@/components/AboutPage/AboutPage'

export const metadata: Metadata = {
  title: 'О нас | Иконописная Артель',
  description: 'Иконописная Артель - описание',
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'О нас',
  },
]

export default function Page(): JSX.Element {
  const title = 'О нас'
  const description = '<p></p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <AboutPage />
    </>
  )
}
