import { JSX } from 'react'
import advantagesStyles from './Advantages.module.scss'
import { AdvantageFromServer } from '@/types/types'
import clsx from 'clsx'
import { fetchCollection, getImageUrl } from '@/lib/api-client'
import Image from 'next/image'
import logoStyles from '@/components/Logo/Logo.module.scss'

export default async function Advantages(): Promise<JSX.Element | null> {
  const advantagesList: AdvantageFromServer[] = await fetchCollection<AdvantageFromServer>(
    'advantages',
    {
      sort: { sort: 1 },
    },
  )

  if (!advantagesList || advantagesList.length === 0) {
    return null
  }

  return (
    <section className={clsx('section', advantagesStyles['advantages'])}>
      <div className="container">
        <h2 className="section__title" data-animate="fade-up">
          Преимущества заказа у нас
        </h2>

        <ul className={advantagesStyles['advantages__list']}>
          {advantagesList.map((item, index) => {
            const title = item.title
            const description = item.description
            const icon = getImageUrl(item.icon._id, 100, 100)

            return (
              <li
                className={advantagesStyles['advantages__item']}
                key={item._id}
                data-animate="fade-up"
                data-stagger={String(index + 1)}
              >
                <Image
                  className={logoStyles['logo__image']}
                  src={icon}
                  width="100"
                  height="100"
                  unoptimized
                  alt="Иконописная Артель"
                />

                <h3 className={advantagesStyles['advantages__item-title']}>{title}</h3>

                {description && (
                  <div className={advantagesStyles['advantages__item-text']}>{description}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
