import { JSX } from 'react'
import clsx from 'clsx'

import { CardItem, WorkFromServer } from '@/types/types'

import LastWorksSlider from './LastWorksSlider'
import lastWorksStyles from './LastWorks.module.scss'
import cockpit from '@/lib/CockpitAPI'

export default async function LastWorks(): Promise<JSX.Element | null> {
  const worksData: WorkFromServer[] = await cockpit.getCollection('works', {
    sort: { date: -1 },
  })

  if (!worksData || worksData.length === 0) {
    return null
  }

  const worksList: CardItem[] = worksData.map((work) => ({
    id: work.slug || work._id,
    title: work.title,
    description: work.description,
    href: `/works/${work.slug || work._id}`,
    image: cockpit.getImageUrl(work.image._id, 400, 400),
    alt: work.image.title || work.title,
  }))

  return (
    <section className={clsx('section', lastWorksStyles['last-works'])}>
      <LastWorksSlider worksList={worksList} />
    </section>
  )
}
