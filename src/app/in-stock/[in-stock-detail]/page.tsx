import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound, redirect } from 'next/navigation'
import { BreadcrumbItem, MasterFromServer, SlideItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import Master from '@/components/Master/Master'
import cockpit from '@/lib/CockpitAPI'

type PageProps = {
  params: Promise<{
    'in-stock-detail': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ['in-stock-detail']: slug } = await params
  const work: WorkFromServer | null =
    (await cockpit.getCollectionItemByField('works', 'slug', slug)) ||
    (await cockpit.getCollectionItem('works', slug))

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
        ? [{ url: cockpit.getImageUrl(work.image._id, 1200, 630), alt: work.title }]
        : [],
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/in-stock/${work.slug || work._id}`,
    },
  }
}

export async function generateStaticParams() {
  const works: WorkFromServer[] = await cockpit.getCollection('works', {
    filter: { in_stock: true },
  })

  return works.map((work) => ({
    'in-stock-detail': work.slug || work._id,
  }))
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { ['in-stock-detail']: slug } = await params
  const work: WorkFromServer | null =
    (await cockpit.getCollectionItemByField('works', 'slug', slug)) ||
    (await cockpit.getCollectionItem('works', slug))

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
      image: cockpit.getImageUrl(image._id, 800, 800),
      alt: image.title || work.title,
    })) || []

  const MasterInfo: MasterFromServer | null = work.master
    ? await cockpit.getCollectionItem('masters', work.master?._id)
    : null

  return (
    <>
      <Heading breadcrumbsList={breadcrumbsList} />

      <Detail
        title={work.title}
        description={work.description}
        image={work.image}
        slidesList={slidesList}
      />

      {MasterInfo && <Master master={MasterInfo} />}
    </>
  )
}
