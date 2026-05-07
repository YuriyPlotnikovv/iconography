import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BreadcrumbItem, GalleryTreeItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import GalleryPageClient from '@/components/GalleryPage/GalleryPageClient'
import { fetchTree } from '@/lib/api-client'
import {
  prepareGalleryItems,
  findGalleryItemBySlug,
  buildGalleryBreadcrumbs,
} from '@/functions/gallery'

export const dynamic = 'force-dynamic'

type PageParams = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params
  const lastSlug = slug[slug.length - 1]
  const galleryData: GalleryTreeItem[] | null = await fetchTree<GalleryTreeItem[]>('gallery')

  if (!galleryData) {
    return {
      title: 'Галерея',
    }
  }

  const currentItem = findGalleryItemBySlug(galleryData, lastSlug)

  return {
    title: currentItem ? `${currentItem.title} | Галерея` : 'Галерея | Иконописная Артель',
    description: currentItem?.title
      ? `Фотогалерея: ${currentItem.title}. Иконописная Артель.`
      : 'Фотогалерея Иконописной Артели. Работы мастеров и события из жизни артели.',
  }
}

export default async function Page({ params }: PageParams): Promise<JSX.Element> {
  const { slug } = await params
  const lastSlug = slug[slug.length - 1]
  const galleryData: GalleryTreeItem[] | null = await fetchTree<GalleryTreeItem[]>('gallery')

  if (!galleryData) {
    notFound()
  }

  const currentItem = findGalleryItemBySlug(galleryData, lastSlug)

  if (!currentItem) {
    notFound()
  }

  const breadcrumbPath = buildGalleryBreadcrumbs(galleryData, lastSlug) || []
  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Галерея',
      url: '/gallery',
    },
    ...breadcrumbPath.slice(0, -1).map((item, index, array) => {
      const pathSegments = array.slice(0, index + 1).map((i) => i.slug)
      return {
        title: item.title,
        url: `/gallery/${pathSegments.join('/')}`,
      }
    }),
    {
      title: currentItem.title,
    },
  ]

  const parentPath = breadcrumbPath
    .slice(0, -1)
    .map((i) => i.slug)
    .join('/')
  const preparedItems = prepareGalleryItems(
    currentItem._children,
    parentPath ? `${parentPath}/${currentItem.slug}` : currentItem.slug,
  )

  return (
    <>
      <Heading title={currentItem.title} breadcrumbsList={breadcrumbsList} />

      {preparedItems.length > 0 && <GalleryPageClient items={preparedItems} />}
    </>
  )
}
