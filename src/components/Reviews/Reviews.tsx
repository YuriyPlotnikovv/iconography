import { JSX } from 'react'
import { ReviewFromServer, ReviewItem } from '@/types/types'
import { fetchCollection } from '@/lib/api-client'
import ReviewsList from '@/components/ReviewsList/ReviewsList'
import FormReviews from '@/components/Forms/FormReviews/FormReviews'
import EmptySection from '@/components/EmptySection/EmptySection'

export default async function Reviews(): Promise<JSX.Element> {
  const reviewsData: ReviewFromServer[] | null = await fetchCollection('reviews')

  const reviewsList: ReviewItem[] = (reviewsData || []).map((review) => ({
    id: review._id,
    date: review.date,
    stars: review.stars,
    name: review.name,
    review: review.review,
  }))

  return (
    <>
      {reviewsList.length > 0 ? (
        <section className="section">
          <div className="container">
            <h2 className="visually-hidden">Отзывы о нас</h2>

            <ReviewsList reviewsList={reviewsList} />
          </div>
        </section>
      ) : (
        <EmptySection />
      )}

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
