import { JSX } from 'react'
import cockpit from '@/lib/CockpitAPI'
import type { CardItem, MainSliderFromServer } from '@/types/types'
import SliderMainClient from './SliderMainClient'

export default async function SliderMain(): Promise<JSX.Element | null> {
  const mainSliderData: MainSliderFromServer[] = await cockpit.getCollection('mainslider', {
    sort: { sort: 1 },
  })

  if (!mainSliderData || mainSliderData.length === 0) {
    return null
  }

  const slidesList: CardItem[] = mainSliderData.map((item) => ({
    id: item._id,
    image: cockpit.getImageUrl(item.image._id, 1200, 800),
    alt: item.title || '',
    title: item.title || '',
    description: item.description || '',
    href: item.link || '',
  }))

  return <SliderMainClient slidesList={slidesList} />
}
