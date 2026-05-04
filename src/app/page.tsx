import type { Metadata } from 'next'
import SliderMain from '@/components/Main/SliderMain/SliderMain'
import Anchor from '@/components/Main/Anchor/Anchor'
import About from '@/components/Main/About/About'
import Advantages from '@/components/Main/Advantages/Advantages'
import LastWorks from '@/components/Main/LastWorks/LastWorks'
import InStock from '@/components/Main/InStock/InStock'
import Masters from '@/components/Main/Masters/Masters'
import Process from '@/components/Main/Process/Process'
import Categories from '@/components/Main/Categories/Categories'
import Calculation from '@/components/Main/Calculation/Calculation'
import Restoration from '@/components/Main/Restoration/Restoration'
import Reviews from '@/components/Main/Reviews/Reviews'
import News from '@/components/Main/News/News'
import Faq from '@/components/Main/Faq/Faq'

export const metadata: Metadata = {
  title: 'Иконописная Артель',
  description:
    'В нашей артели Вы можете заказать рукописную каноническую икону. Мы пишем в древней технологии яичной темперой храмовые, семейные, мерные иконы, венчальные пары.',
  keywords: [
    'иконописная артель',
    'заказать икону',
    'рукописные иконы',
    'каноническая икона',
    'яичная темпера',
    'храмовые иконы',
    'семейные иконы',
    'мерные иконы',
    'венчальные пары',
    'реставрация икон',
    'иконописцы',
    'иконопись',
  ],
  openGraph: {
    title: 'Иконописная Артель - Рукописные канонические иконы',
    description:
      'Закажите рукописную каноническую икону. Храмовые, семейные, мерные иконы, венчальные пары. Древняя технология яичной темперой.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Иконописная Артель' }],
  },
}

export default function Page() {
  return (
    <>
      <h1 className="visually-hidden">Иконописная Артель</h1>

      <SliderMain />
      <Anchor />
      <About />
      <Advantages />
      <LastWorks />
      <InStock />
      <Masters />
      <Process />
      <Categories />
      <Calculation />
      <Restoration />
      <Reviews />
      <News />
      <Faq />
    </>
  )
}
