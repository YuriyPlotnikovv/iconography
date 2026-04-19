import { JSX } from 'react'
import newsStyles from './News.module.scss'
import { CardItem, NewsFromServer } from '@/types/types'
import Card from '@/components/Card/Card'
import clsx from 'clsx'
import cockpit from '@/lib/CockpitAPI'

export default async function News(): Promise<JSX.Element | null> {
  const newsData: NewsFromServer[] = await cockpit.getCollection('news')

  if (!newsData || newsData.length === 0) {
    return null
  }

  const newsList: CardItem[] = newsData.map((news) => ({
    id: news._id,
    title: news.title,
    description: news.description,
    href: `/news/${news._id}`,
    image: cockpit.getImageUrl(news.image._id, 400, 400),
    alt: news.image.title || news.title,
  }))

  return (
    <section className={clsx('section', newsStyles['news'])}>
      <div className="container">
        <h2 className="visually-hidden">Список новостей</h2>

        <ul className={newsStyles['news__list']}>
          {newsList.map((news) => {
            return (
              <li className={newsStyles['news__item']} key={news.id}>
                <Card data={news} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
