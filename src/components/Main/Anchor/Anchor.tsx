'use client'

import React, { JSX, useEffect, useState } from 'react'
import anchorStyles from './Anchor.module.scss'
import { MenuItem } from '@/types/types'
import clsx from 'clsx'

const anchorLinks: MenuItem[] = [
  {
    label: 'Наши мастера',
    href: '#masters',
  },
  {
    label: 'Процесс сотворения образа',
    href: '#process',
  },
  {
    label: 'Категории икон',
    href: '#categories',
  },
  {
    label: 'Расчёт стоимости',
    href: '#calculation',
  },
  {
    label: 'Реставрация',
    href: '#restoration',
  },
  {
    label: 'Вопрос-ответ',
    href: '#faq',
  },
]

export default function Anchor(): JSX.Element {
  const [visibleLinks, setVisibleLinks] = useState<MenuItem[]>([])

  useEffect(() => {
    const checkLinks = () => {
      const present = anchorLinks.filter((link) => {
        if (link.href && link.href.startsWith('#')) {
          const id = link.href.slice(1)
          try {
            return Boolean(document.getElementById(id) || document.querySelector(link.href))
          } catch {
            return false
          }
        }

        return true
      })

      setVisibleLinks(present)
    }

    checkLinks()

    const observer = new MutationObserver(() => {
      checkLinks()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  if (visibleLinks.length === 0) {
    return <></>
  }

  return (
    <section className={clsx('section', anchorStyles['anchor'])}>
      <h2 className="visually-hidden">Навигация по странице</h2>

      <nav
        className={clsx('container', anchorStyles['anchor__container'])}
        aria-label="По главной странице"
      >
        <ul className={anchorStyles['anchor__list']}>
          {visibleLinks.map((link) => {
            return (
              <li className={anchorStyles['anchor__item']} key={link.href}>
                <a className={anchorStyles['anchor__link']} href={link.href}>
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </section>
  )
}
