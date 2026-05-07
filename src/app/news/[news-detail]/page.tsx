import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound, redirect } from 'next/navigation'
import { BreadcrumbItem, NewsFromServer, SlideItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import { fetchCollectionItem, getImageUrl } from '@/lib/api-client'

export const dynamic = 'force-dynamic'

type PageParams = {
  params: Promise<{
    'news-detail': string
  }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { ['news-detail']: slug } = await params

  let news = await fetchCollectionItem<NewsFromServer>('news', slug, { field: 'slug' })
  if (!news) news = await fetchCollectionItem<NewsFromServer>('news', slug)

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
      images: news.image ? [{ url: getImageUrl(news.image._id, 1200, 630), alt: news.title }] : [],
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/news/${news.slug || news._id}`,
    },
  }
}

export default async function Page({ params }: PageParams): Promise<JSX.Element> {
  const { ['news-detail']: slug } = await params

  let news = await fetchCollectionItem<NewsFromServer>('news', slug, { field: 'slug' })
  if (!news) news = await fetchCollectionItem<NewsFromServer>('news', slug)

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
      image: getImageUrl(image._id, 800, 800),
      alt: image.title || news.title,
    })) || []

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: news.title,
    description: (news.content || news.description || '').replace(/<[^>]*>/g, '').slice(0, 160),
    image: news.image ? getImageUrl(news.image._id, 1200, 630) : undefined,
    datePublished: news._created ? new Date(news._created * 1000).toISOString() : undefined,
    dateModified: news._modified ? new Date(news._modified * 1000).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: 'Иконописная Артель',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Иконописная Артель',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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
