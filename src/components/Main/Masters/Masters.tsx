import { JSX } from 'react'
import clsx from 'clsx'

import { CardItem, MasterFromServer } from '@/types/types'

import MastersSlider from './MastersSlider'
import mastersStyles from './Masters.module.scss'
import { fetchCollection, getImageUrl } from '@/lib/api-client'

export default async function Masters(): Promise<JSX.Element | null> {
  const mastersData: MasterFromServer[] = await fetchCollection<MasterFromServer>('masters', {
    sort: { sort: 1 },
  })

  if (!mastersData || mastersData.length === 0) {
    return null
  }

  const mastersList: CardItem[] = mastersData.map((master) => ({
    id: master.slug || master._id,
    title: master.name,
    description: master.description,
    href: `/masters/${master.slug || master._id}`,
    image: getImageUrl(master.image._id, 400, 400),
    alt: master.image.title || master.name,
  }))

  return (
    <section className={clsx('section', mastersStyles['masters'])} id="masters">
      <MastersSlider mastersList={mastersList} />
    </section>
  )
}
