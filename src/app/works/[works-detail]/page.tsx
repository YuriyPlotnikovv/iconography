import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BreadcrumbItem, MasterFromServer, SlideItem, WorkFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import Master from '@/components/Master/Master'
import cockpit from '@/lib/CockpitAPI'

type PageProps = {
  params: Promise<{
    'works-detail': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ['works-detail']: workId } = await params
  const work: WorkFromServer | null = await cockpit.getCollectionItem('works', workId)

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
      images: work.image? [{ url: cockpit.getImageUrl(work.image._id, 1200, 630), alt: work.title }] : [],
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/works/${work._id}`,
    },
  }
}

export async function generateStaticParams() {
  const works: WorkFromServer[] = await cockpit.getCollection('works')

  return works.map((work) => ({
    'works-detail': work._id,
  }))
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { ['works-detail']: workId } = await params
  const work: WorkFromServer | null = await cockpit.getCollectionItem('works', workId)

  if (!work) {
    notFound()
  }

  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Наши работы',
      url: '/works',
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
