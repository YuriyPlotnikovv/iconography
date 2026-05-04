import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import AboutPage from '@/components/AboutPage/AboutPage'

export const metadata: Metadata = {
  title: 'О нас | Иконописная Артель',
  description: 'Наши мастера создают рукописные иконы в древней технологии яичной темперой, следуя каноническим образцам.',
  openGraph: {
    title: 'О нас | Иконописная Артель',
    description:
      'Наши мастера создают рукописные иконы в древней технологии яичной темперой, следуя каноническим образцам.',
  },
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
  const description = '<p>Наша артель объединяет опытных иконописцев, которые создают рукописные иконы в строгом соответствии с каноническими традициями. Мы используем древнюю технологию яичной темперой, натуральные пигменты и следуем заветам мастеров прошлого.</p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <AboutPage />
    </>
  )
}
