import { JSX } from 'react'
import Link from 'next/link'

import { ReviewFromServer, ReviewItem } from '@/types/types'
import ReviewsList from '@/components/ReviewsList/ReviewsList'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

export default async function Reviews(): Promise<JSX.Element | null> {
  const reviewsData: ReviewFromServer[] = await fetchCollection<ReviewFromServer>('reviews', {
    sort: { date: -1 },
    limit: 6,
  })

  if (!reviewsData || reviewsData.length === 0) {
    return null
  }

  const reviewsList: ReviewItem[] = reviewsData.map((review) => {
    const photos: Array<{ thumb: string; full: string }> = []

    if (review.photos && review.photos.length > 0) {
      review.photos.forEach((img) => {
        if (img._id) {
          photos.push({
            thumb: getImageUrl(img._id, 400, 300, 'thumbnail'),
            full: getImageUrl(img._id, 1920, 1080, 'bestFit'),
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

  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title" data-animate="fade-up">
          Отзывы
        </h2>

        <ReviewsList reviewsList={reviewsList} />

        <Link className="button button--accent" href="/reviews">
          Посмотреть ещё
        </Link>
      </div>
    </section>
  )
}
