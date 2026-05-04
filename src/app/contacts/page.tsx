import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import ContactsPage from '@/components/ContactsPage/ContactsPage'

export const metadata: Metadata = {
  title: 'Контакты | Иконописная Артель',
  description: 'Контактная информация Иконописной Артели. Адрес мастерской, телефон, email для заказа икон. Свяжитесь с нами для консультации.',
  openGraph: {
    title: 'Контакты | Иконописная Артель',
    description:
      'Контактная информация Иконописной Артели. Адрес мастерской, телефон, email для заказа икон.',
  },
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
  const description = '<p>Свяжитесь с нами для консультации по заказу икон. Наши мастера ответят на все вопросы о технологии написания, сроках изготовления и стоимости работ. Приглашаем посетить нашу мастерскую.</p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <ContactsPage />
    </>
  )
}
