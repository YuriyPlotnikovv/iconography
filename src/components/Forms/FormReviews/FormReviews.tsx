import type { JSX } from 'react'
import FormReviewsClient from './FormReviewsClient'

export default function FormReviews(): JSX.Element {
  return (
    <FormReviewsClient agreementUrl="/api/documents/agreement" policyUrl="/api/documents/policy" />
  )
}
