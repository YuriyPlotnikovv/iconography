import { JSX } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import styles from './Pagination.module.scss'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  const getHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`)

  return (
    <nav aria-label="Пагинация" className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={getHref(currentPage - 1)}
          className={styles['pagination__prev']}
          aria-label="Предыдущая страница"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </Link>
      )}

      <ul className={styles['pagination__list']}>
        {pages.map((page, index) =>
          page === '...' ? (
            <li
              key={`ellipsis-${index}`}
              className={styles['pagination__ellipsis']}
              aria-hidden="true"
            >
              ···
            </li>
          ) : (
            <li key={page} className={styles['pagination__item']}>
              <Link
                href={getHref(page)}
                className={clsx(styles['pagination__link'], {
                  [styles['pagination__link--active']]: page === currentPage,
                })}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`Страница ${page}`}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ul>

      {currentPage < totalPages && (
        <Link
          href={getHref(currentPage + 1)}
          className={styles['pagination__next']}
          aria-label="Следующая страница"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </Link>
      )}
    </nav>
  )
}
