import { JSX } from 'react'
import reviewsListStyles from './ReviewsList.module.scss'
import { ReviewItem } from '@/types/types'
import { convertDateToLocale } from '@/functions/functions'

type ReviewsListProps = {
  reviewsList: ReviewItem[]
}

export default function ReviewsList({ reviewsList }: ReviewsListProps): JSX.Element {
  return (
    <ul className={reviewsListStyles['reviews']}>
      {reviewsList.map((review, index) => {
        return (
          <li
            className={reviewsListStyles['reviews__item']}
            key={review.id}
            data-animate="fade-up"
            data-stagger={String(index % 6)}
          >
            <svg
              className={reviewsListStyles['reviews__item-decor']}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g clipPath="url(#clip0_3796_252)">
                <path
                  fillRule="evenodd"
                  d="M13.667 22.321v-4.004c0-.544.44-.984.983-.984 1.938 0 2.992-1.987 3.138-5.91H14.65a.984.984 0 0 1-.983-.983V1.984c0-.543.44-.983.983-.983h8.367c.542 0 .983.44.983.983v8.456c0 1.88-.19 3.606-.563 5.13-.382 1.562-.97 2.927-1.746 4.06-.797 1.162-1.796 2.075-2.967 2.71-1.179.64-2.55.965-4.074.965a.984.984 0 0 1-.983-.984ZM.983 17.333a.983.983 0 0 0-.983.983v4.005c0 .543.44.983.983.983 1.524 0 2.896-.324 4.074-.964 1.171-.636 2.17-1.548 2.968-2.712.776-1.131 1.363-2.497 1.746-4.06.373-1.524.562-3.25.562-5.129V1.983A.983.983 0 0 0 9.35 1H.983A.983.983 0 0 0 0 1.983v8.456c0 .543.44.983.983.983h3.094c-.144 3.924-1.183 5.91-3.094 5.91Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_3796_252">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>

            <div className={reviewsListStyles['reviews__item-text']}>{review.review}</div>

            <div className={reviewsListStyles['reviews__item-info']}>
              <time className={reviewsListStyles['reviews__item-date']} dateTime={review.date}>
                {convertDateToLocale(review.date)}
              </time>

              <p className={reviewsListStyles['reviews__item-name']}>{review.name}</p>

              <p className={reviewsListStyles['reviews__item-rating']}>
                <span className={reviewsListStyles['reviews__item-rating-value']}>
                  {review.stars}
                </span>

                <svg
                  className={reviewsListStyles['reviews__item-rating-icon']}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                >
                  <path
                    fillRule="evenodd"
                    d="m12 1.435 3.63 6.49L23 9.318l-5.133 5.39.916 7.334L12 18.925l-6.783 3.153.916-7.333L1 9.318l7.37-1.393L12 1.435Z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
