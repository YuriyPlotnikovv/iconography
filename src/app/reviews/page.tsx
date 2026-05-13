import type { Metadata } from 'next'
import { JSX } from 'react'
import { BreadcrumbItem, ReviewFromServer, ReviewItem } from '@/types/types'
import Heading from '@/components/Heading/Heading'
import Reviews from '@/components/Reviews/Reviews'
import Pagination from '@/components/Pagination/Pagination'
import FormReviews from '@/components/Forms/FormReviews/FormReviews'
import { fetchCollection, fetchCollectionCount, getImageUrl } from '@/lib/api-client'
import { REVIEWS_PER_PAGE } from '@/const/const'

export const metadata: Metadata = {
  title: 'Отзывы | Иконописная Артель',
  description:
    'Отзывы наших клиентов о работе Иконописной Артели. Мнения о качестве икон, сроках исполнения и профессионализме мастеров.',
  openGraph: {
    title: 'Отзывы | Иконописная Артель',
    description:
      'Отзывы наших клиентов о работе Иконописной Артели. Мнения о качестве икон, сроках исполнения и профессионализме мастеров.',
  },
}

const breadcrumbsList: BreadcrumbItem[] = [
  {
    title: 'Главная',
    url: '/',
  },
  {
    title: 'Отзывы',
  },
]

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}): Promise<JSX.Element> {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1') || 1)
  const skip = (currentPage - 1) * REVIEWS_PER_PAGE

  const title = 'Отзывы'
  const description =
    '<p>Мы ценим мнение каждого клиента. Здесь Вы можете ознакомиться с отзывами о качестве наших икон, сроках исполнения заказов и профессионализме мастеров. Благодарим за доверие!</p>'

  const [reviewsData, total] = await Promise.all([
    fetchCollection<ReviewFromServer>('reviews', {
      sort: { date: -1 },
      limit: REVIEWS_PER_PAGE,
      skip,
    }),
    fetchCollectionCount('reviews'),
  ])

  const reviewsList: ReviewItem[] = (reviewsData || []).map((review) => {
    const photos: Array<{ thumb: string; full: string }> = []

    if (review.photos && review.photos.length > 0) {
      review.photos.forEach((img) => {
        if (img._id) {
          photos.push({
            thumb: getImageUrl(img._id, 400, 300),
            full: getImageUrl(img._id, 1920, 1080, { mode: 'bestFit' }),
          })
        }
      })
    }

    return {
      id: review._id,
      date: review.date,
      stars: review.stars,
      name: review.name,
      review: review.review,
      ...(photos.length > 0 ? { photos } : {}),
    }
  })

  const totalPages = Math.ceil(total / REVIEWS_PER_PAGE)

  return (
    <>
      <Heading title={title} description={description} breadcrumbsList={breadcrumbsList} />

      <Reviews reviewsList={reviewsList}>
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/reviews" />
      </Reviews>

      <section className="section">
        <div className="container">
          <h2 className="section__title" data-animate="fade-up">
            Оставить отзыв
          </h2>

          <FormReviews />
        </div>
      </section>
    </>
  )
}
