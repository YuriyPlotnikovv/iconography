import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Reviews from '@/components/Reviews/Reviews'

export const metadata: Metadata = {
  title: 'Отзывы | Иконописная Артель',
  description:
    'Отзывы наших клиентов о работе Иконописной Артели. Мнения о качестве икон, сроках исполнения и профессионализме мастеров.',
  openGraph: {
    title: 'Отзывы | Иконописная Артель',
    description:
      'Отзывы наших клиентов о работе Иконописной Артели. Мнения о качестве икон, сроках исполнения и профессионализме мастеров.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Отзывы',
  },
]

export default function Page(): JSX.Element {
  const title = 'Отзывы'
  const description =
    '<p>Мы ценим мнение каждого клиента. Здесь Вы можете ознакомиться с отзывами о качестве наших икон, сроках исполнения заказов и профессионализме мастеров. Благодарим за доверие!</p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Reviews />
    </>
  )
}
