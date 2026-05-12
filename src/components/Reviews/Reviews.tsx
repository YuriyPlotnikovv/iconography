import { JSX, ReactNode } from 'react'
import { ReviewItem } from '@/types/types'
import ReviewsList from '@/components/ReviewsList/ReviewsList'
import EmptySection from '@/components/EmptySection/EmptySection'

type ReviewsProps = {
  reviewsList: ReviewItem[]
  children?: ReactNode
}

export default function Reviews({ reviewsList, children }: ReviewsProps): JSX.Element {
  return (
    <>
      {reviewsList.length > 0 ? (
        <section className="section">
          <div className="container">
            <h2 className="visually-hidden">Отзывы о нас</h2>

            <ReviewsList reviewsList={reviewsList} />

            {children}
          </div>
        </section>
      ) : (
        <EmptySection />
      )}
    </>
  )
}
