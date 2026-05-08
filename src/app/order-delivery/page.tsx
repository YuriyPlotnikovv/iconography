import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import FormCalculation from '@/components/Forms/FormCalculation/FormCalculation'
import Payment from '@/components/Payment/Payment'
import FormContacts from '@/components/Forms/FormContacts/FormContacts'

export const metadata: Metadata = {
  title: 'Заказ и доставка | Иконописная Артель',
  description:
    'Как заказать икону в Иконописной Артели. Этапы работы, способы оплаты и доставки. Калькулятор расчета стоимости иконы.',
  openGraph: {
    title: 'Заказ и доставка | Иконописная Артель',
    description:
      'Как заказать икону в Иконописной Артели. Этапы работы, способы оплаты и доставки. Калькулятор расчета стоимости иконы.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Заказ и доставка',
  },
]

export default function Page(): JSX.Element {
  const title = 'Заказ и доставка'
  const description =
    '<p>Узнайте, как заказать рукописную икону в нашей артели: от первой консультации до доставки готовой работы. Информация об этапах создания иконы, способах оплаты и доставки по России и за рубеж.</p>'

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Payment />

      <section className="section">
        <div className="container">
          <h2 className="section__title" data-animate="fade-up">
            Связаться с нами
          </h2>

          <FormContacts />
        </div>
      </section>

      <section className="section calculation">
        <div className="container">
          <h2 className="section__title" data-animate="fade-up">
            Расчёт примерной стоимости
          </h2>

          <p className="section__description" data-animate="fade-up" data-stagger="1">
            (выполнение гравировки и ассиста рассчитывается отдельно)
          </p>

          <FormCalculation />
        </div>
      </section>
    </>
  )
}
