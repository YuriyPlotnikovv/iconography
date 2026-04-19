import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BreadcrumbItem, NewsFromServer, SlideItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import cockpit from '@/lib/CockpitAPI'

type PageParams = {
  params: Promise<{
    'news-detail': string
  }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { ['news-detail']: id } = await params
  const news: NewsFromServer | null = await cockpit.getCollectionItem('news', id)

  if (!news) {
    return {
      title: 'Новость не найдена | Иконописная Артель',
    }
  }

  return {
    title: `${news.title} | Иконописная Артель`,
    description: news.description,
  }
}

export default async function Page({ params }: PageParams): Promise<JSX.Element> {
  const { ['news-detail']: id } = await params
  const news: NewsFromServer | null = await cockpit.getCollectionItem('news', id)

  if (!news) {
    notFound()
  }

  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Новости',
      url: '/news',
    },
    {
      title: news.title,
    },
  ]

  const slidesList: SlideItem[] =
    news.slider?.map((image) => ({
      id: image._id,
      image: cockpit.getImageUrl(image._id, 800, 800),
      alt: image.title || news.title,
    })) || []

  return (
    <>
      <Heading breadcrumbsList={breadcrumbsList} />

      <Detail
        title={news.title}
        description={news.content}
        image={news.image}
        slidesList={slidesList}
      />
    </>
  )
}
