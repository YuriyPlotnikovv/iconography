import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BreadcrumbItem, GalleryTreeItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import GalleryPageClient from '@/components/GalleryPage/GalleryPageClient'
import cockpit from '@/lib/CockpitAPI'
import { prepareGalleryItems, findGalleryItemBySlug, buildGalleryBreadcrumbs } from '@/functions/gallery'

type PageParams = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const galleryData: GalleryTreeItem[] | null = await cockpit.getTree('gallery')

  if (!galleryData) {
    return {
      title: 'Галерея',
    }
  }

  const currentItem = findGalleryItemBySlug(galleryData, slug)

  return {
    title: currentItem
      ? `${currentItem.title} | Галерея`
      : 'Галерея | Иконописная Артель',
    description: 'Иконописная Артель - наши фото',
  }
}

export default async function Page({ params }: PageParams): Promise<JSX.Element> {
  const { slug } = await params
  const galleryData: GalleryTreeItem[] | null = await cockpit.getTree('gallery')

  if (!galleryData) {
    notFound()
  }

  const currentItem = findGalleryItemBySlug(galleryData, slug)

  if (!currentItem) {
    notFound()
  }

  const breadcrumbPath = buildGalleryBreadcrumbs(galleryData, slug) || []
  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Галерея',
      url: '/gallery',
    },
    ...breadcrumbPath.slice(0, -1).map((item) => ({
      title: item.title,
      url: `/gallery/${item.slug}`,
    })),
    {
      title: currentItem.title,
    },
  ]

  const preparedItems = prepareGalleryItems(currentItem._children)

  return (
    <>
      <Heading title={currentItem.title} breadcrumbsList={breadcrumbsList} />

      {preparedItems.length > 0 && <GalleryPageClient items={preparedItems} />}
    </>
  )
}


