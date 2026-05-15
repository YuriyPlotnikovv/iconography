import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound, redirect } from 'next/navigation'
import { BreadcrumbItem, MasterFromServer, SlideItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import Master from '@/components/Master/Master'
import { fetchCollectionItem, getImageUrl } from '@/lib/api-client'

type PageProps = {
  params: Promise<{
    'in-stock-detail': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ['in-stock-detail']: slug } = await params

  let work = await fetchCollectionItem<WorkFromServer>('works', slug, { field: 'slug' })
  if (!work) work = await fetchCollectionItem<WorkFromServer>('works', slug)

  if (!work) {
    return {
      title: 'Работа не найдена | Иконописная Артель',
    }
  }

  const description = work.description ? work.description.replace(/<[^>]*>/g, '').slice(0, 160) : ''

  return {
    title: `${work.title} | Иконописная Артель`,
    description,
    openGraph: {
      title: work.title,
      description,
      images: work.image
        ? [{ url: getImageUrl(work.image._id, 1200, 630, { mime: 'jpeg' }), alt: work.title }]
        : [],
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/in-stock/${work.slug || work._id}`,
    },
  }
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { ['in-stock-detail']: slug } = await params

  let work = await fetchCollectionItem<WorkFromServer>('works', slug, { field: 'slug' })
  if (!work) work = await fetchCollectionItem<WorkFromServer>('works', slug)

  if (!work) {
    notFound()
  }

  if (work.slug && work.slug !== slug) {
    redirect(`/in-stock/${work.slug}`)
  }

  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Рукописные иконы в наличии',
      url: '/in-stock',
    },
    {
      title: work.title,
    },
  ]

  const slidesList: SlideItem[] =
    work.slider?.map((image) => ({
      id: image._id,
      image: getImageUrl(image._id, 800, 500),
      imageFull: getImageUrl(image._id, 1600, 1000, { mode: 'bestFit' }),
      alt: image.title || work.title,
    })) || []

  const MasterInfo: MasterFromServer | null = work.master
    ? await fetchCollectionItem<MasterFromServer>('masters', work.master?._id)
    : null

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: work.title,
    description: work.description
      ? work.description.replace(/<[^>]*>/g, '').slice(0, 160)
      : work.title,
    image: work.image
      ? getImageUrl(work.image._id, 1200, 630, { mode: 'thumbnail', mime: 'jpeg' })
      : undefined,
    brand: {
      '@type': 'Organization',
      name: 'Иконописная Артель',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/in-stock/${work.slug || work._id}`,
      ...(work.price && !isNaN(parseFloat(work.price))
        ? { price: parseFloat(work.price), priceCurrency: 'RUB' }
        : {}),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <Heading breadcrumbsList={breadcrumbsList} />

      <Detail
        title={work.title}
        description={work.description}
        image={work.image}
        slidesList={slidesList}
        price={work.price}
        size={work.size}
      />

      {MasterInfo && <Master master={MasterInfo} />}
    </>
  )
}
