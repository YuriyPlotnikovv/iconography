import type { JSX } from 'react'
import FormCalculationClient from './FormCalculationClient'
import cockpit from '@/lib/CockpitAPI'

export default async function FormCalculation(): Promise<JSX.Element> {
  const prices = (await cockpit.getCollection('price', { sort: { sort: 1 } })) || []

  return <FormCalculationClient prices={prices} />
}
