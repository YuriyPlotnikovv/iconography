import { JSX } from 'react'
import { fetchCollection, getImageUrl } from '@/lib/api-client'
import type { MainSliderItem, MainSliderFromServer } from '@/types/types'
import SliderMainClient from './SliderMainClient'

export default async function SliderMain(): Promise<JSX.Element | null> {
  const mainSliderData: MainSliderFromServer[] = await fetchCollection<MainSliderFromServer>(
    'mainslider',
    {
      sort: { sort: 1 },
    },
  )

  if (!mainSliderData || mainSliderData.length === 0) {
    return null
  }

  const slidesList: MainSliderItem[] = mainSliderData.map((item) => ({
    id: item._id,
    image: getImageUrl(item.image._id, 1920, 1080, { mode: 'bestFit' }),
    alt: item.title || '',
    title: item.title || '',
    description: item.description || '',
    button: {
      link: item.button?.link || '',
      name: item.button?.name || '',
    },
  }))

  return <SliderMainClient slidesList={slidesList} />
}
