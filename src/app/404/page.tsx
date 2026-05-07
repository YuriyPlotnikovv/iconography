import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import NotFound from '@/components/NotFound/NotFound'

export const metadata: Metadata = {
  title: 'Страница не найдена | Иконописная Артель',
  description:
    'Запрашиваемая страница не найдена. Вернитесь на главную страницу Иконописной Артели.',
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Страница не найдена',
  },
]

export default function Page(): JSX.Element {
  return (
    <>
      <Heading title={'Страница не найдена'} breadcrumbsList={breadcrumbsList} />

      <NotFound />
    </>
  )
}
