import type { JSX } from 'react'
import FormOrderClient from './FormOrderClient'
import { fetchCollection } from '@/lib/api-client'
import type { CategoryFromServer, PriceItem } from '@/types/types'

export default async function FormOrder(): Promise<JSX.Element> {
  const [categories, prices] = await Promise.all([
    fetchCollection<CategoryFromServer>('categories', { sort: { sort: 1 } }),
    fetchCollection<PriceItem>('price', { sort: { sort: 1 } }),
  ])

  return (
    <FormOrderClient
      categories={categories}
      prices={prices}
      agreementUrl="/api/documents/agreement"
      policyUrl="/api/documents/policy"
    />
  )
}
