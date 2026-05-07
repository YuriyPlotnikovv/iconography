import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, GalleryTreeItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import GalleryPageClient from '@/components/GalleryPage/GalleryPageClient'
import { fetchTree } from '@/lib/api-client'
import { prepareGalleryItems } from '@/functions/gallery'

export const metadata: Metadata = {
  title: 'Галерея | Иконописная Артель',
  description:
    'Фотогалерея Иконописной Артели. Фотографии работ наших мастеров, процесса создания икон, мастерской и событий из жизни артели.',
  openGraph: {
    title: 'Галерея | Иконописная Артель',
    description:
      'Фотогалерея Иконописной Артели. Фотографии работ наших мастеров, процесса создания икон, мастерской и событий.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Галерея',
  },
]

export default async function Page(): Promise<JSX.Element> {
  const title = 'Галерея'
  const description =
    '<p>Ознакомьтесь с фотографиями из жизни нашей артели: работы мастеров, процесс создания икон, мастерская и другие события.</p>'

  const galleryData: GalleryTreeItem[] | null = await fetchTree<GalleryTreeItem[]>('gallery')
  const preparedItems = galleryData ? prepareGalleryItems(galleryData) : []

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      {preparedItems.length > 0 && <GalleryPageClient items={preparedItems} />}
    </>
  )
}
