import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound, redirect } from 'next/navigation'
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
  const { ['news-detail']: slug } = await params
  // Try to resolve by slug first (new), fallback to id if needed
  const news: NewsFromServer | null = (await cockpit.getCollectionItemByField('news', 'slug', slug)) || (await cockpit.getCollectionItem('news', slug))

  if (!news) {
    return {
      title: 'Новость не найдена | Иконописная Артель',
    }
  }

  const description = (news.content || news.description || '').replace(/<[^>]*>/g, '').slice(0, 160)

  return {
    title: `${news.title} | Иконописная Артель`,
    description,
    openGraph: {
      title: news.title,
      description,
      images: news.image ? [{ url: cockpit.getImageUrl(news.image._id, 1200, 630), alt: news.title }] : [],
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/news/${news.slug || news._id}`,
    },
  }
}

export default async function Page({ params }: PageParams): Promise<JSX.Element> {
  const { ['news-detail']: slug } = await params
  const news: NewsFromServer | null = (await cockpit.getCollectionItemByField('news', 'slug', slug)) || (await cockpit.getCollectionItem('news', slug))

  if (!news) {
    notFound()
  }

  // If route used an id but the item has a slug, redirect to canonical slug URL for SEO
  if (news.slug && news.slug !== slug) {
    redirect(`/news/${news.slug}`)
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
