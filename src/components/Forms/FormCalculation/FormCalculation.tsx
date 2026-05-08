import type { JSX } from 'react'
import FormCalculationClient from './FormCalculationClient'
import { fetchCollection } from '@/lib/api-client'
import type { PriceItem } from '@/types/types'

export default async function FormCalculation(): Promise<JSX.Element> {
  const prices = await fetchCollection<PriceItem>('price', { sort: { sort: 1 } })

  return <FormCalculationClient prices={prices} />
}
