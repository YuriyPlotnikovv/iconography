import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, GalleryTreeItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import GalleryPageClient from '@/components/GalleryPage/GalleryPageClient'
import cockpit from '@/lib/CockpitAPI'
import { prepareGalleryItems } from '@/functions/gallery'

export const metadata: Metadata = {
  title: 'Галерея',
  description: 'Иконописная Артель - описание',
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
  const description = '<p></p>'

  const galleryData: GalleryTreeItem[] | null = await cockpit.getTree('gallery')
  const preparedItems = galleryData ? prepareGalleryItems(galleryData) : []

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      {preparedItems.length > 0 && <GalleryPageClient items={preparedItems} />}
    </>
  )
}
