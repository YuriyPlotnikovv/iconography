import type { Metadata } from 'next'
import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { BreadcrumbItem, CategoryFromServer, SlideItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Detail from '@/components/Detail/Detail'
import { fetchCollectionItem, getImageUrl } from '@/lib/api-client'

type PageProps = {
  params: Promise<{
    'categories-detail': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ['categories-detail']: slug } = await params

  try {
    let category = await fetchCollectionItem<CategoryFromServer>('category', slug, {
      field: 'slug',
    })
    if (!category) category = await fetchCollectionItem<CategoryFromServer>('category', slug)

    if (!category) {
      return {
        title: 'Категория не найдена | Иконописная Артель',
      }
    }

    return {
      title: `${category.title} | Иконописная Артель`,
      description: category.description
        ? category.description.replace(/<[^>]*>/g, '').slice(0, 160)
        : '',
      openGraph: {
        title: category.title,
        description: category.description
          ? category.description.replace(/<[^>]*>/g, '').slice(0, 160)
          : '',
        images: category.image
          ? [{ url: getImageUrl(category.image._id, 1200, 630), alt: category.title }]
          : [],
      },
      alternates: {
        canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}/categories/${category.slug || category._id}`,
      },
    }
  } catch {
    return {
      title: 'Категория не найдена | Иконописная Артель',
    }
  }
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { ['categories-detail']: slug } = await params

  let category = await fetchCollectionItem<CategoryFromServer>('category', slug, { field: 'slug' })
  if (!category) category = await fetchCollectionItem<CategoryFromServer>('category', slug)

  if (!category) {
    notFound()
  }

  const breadcrumbsList: BreadcrumbItem[] = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Категории',
      url: '/categories',
    },
    {
      title: category.title,
    },
  ]

  const slidesList: SlideItem[] = category.slider?.map((image) => ({
    id: image._id,
    image: getImageUrl(image._id, 800, 800),
    alt: image.title || category.title,
  }))

  return (
    <>
      <Heading breadcrumbsList={breadcrumbsList} />

      <Detail
        title={category.title}
        description={category.description}
        image={category.image}
        slidesList={slidesList}
      />
    </>
  )
}
