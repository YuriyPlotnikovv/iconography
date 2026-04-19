import { JSX } from 'react'
import breadcrumbsStyles from './Breadcrumbs.module.scss'
import Link from 'next/link'
import { BreadcrumbItem } from '@/types/types'

type BreadcrumbsProps = {
  breadcrumbsList: BreadcrumbItem[]
}

export default function Breadcrumbs({ breadcrumbsList }: BreadcrumbsProps): JSX.Element {
  return (
    <nav
      className={breadcrumbsStyles['breadcrumbs']}
      aria-label="Хлебные крошки"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className={breadcrumbsStyles['breadcrumbs__list']}>
        {breadcrumbsList.map((item, index) => {
          const isLastItem = index === breadcrumbsList.length - 1
          const position = index + 1

          return (
            <li
              key={item.title + (item.url || index)}
              className={breadcrumbsStyles['breadcrumbs__item']}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              {...(isLastItem && { 'aria-current': 'page' })}
            >
              {item.url && !isLastItem ? (
                <Link
                  className={breadcrumbsStyles['breadcrumbs__item-link']}
                  itemProp="item"
                  href={item.url}
                >
                  <span itemProp="name">{item.title}</span>
                </Link>
              ) : (
                <span className={breadcrumbsStyles['breadcrumbs__item-link']} itemProp="name">
                  {item.title}
                </span>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
