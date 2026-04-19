import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import ContactsPage from '@/components/ContactsPage/ContactsPage'

export const metadata: Metadata = {
  title: 'Контакты | Иконописная Артель',
  description: 'Иконописная Артель - описание',
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Контакты',
  },
]

export default function Page(): JSX.Element {
  const title = 'Контакты'
  const description = '<p></p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <ContactsPage />
    </>
  )
}
