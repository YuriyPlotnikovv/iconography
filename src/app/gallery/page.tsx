import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, CardItem, GalleryFromServer } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import GalleryPage from '@/components/GalleryPage/GalleryPage'
import cockpit from '@/lib/CockpitAPI'

export const metadata: Metadata = {
  title: 'Галерея | Иконописная Артель',
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

  const galleryData: GalleryFromServer[] | null = await cockpit.getCollection('gallery', {
    sort: { sort: 1 },
  })

  const galleryList: CardItem[] = (galleryData || []).map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    href: '/gallery',
    image: cockpit.getImageUrl(item.image._id, 400, 400),
    alt: item.image.title || item.title,
  }))

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      {galleryList.length > 0 && <GalleryPage galleryList={galleryList} />}
    </>
  )
}
