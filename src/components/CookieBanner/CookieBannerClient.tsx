'use client'
import { JSX, useState } from 'react'
import Link from 'next/link'
import { COOKIE_CATEGORIES } from '@/const/const'
import { CookieConsent } from '@/types/types'
import { useCookieConsent } from '@/context/CookieConsentContext'
import styles from './CookieBanner.module.scss'
import clsx from 'clsx'

type Props = {
  cookiePolicyUrl: string
}

export default function CookieBannerClient({ cookiePolicyUrl }: Props): JSX.Element | null {
  const { isBannerVisible, saveConsent, consent } = useCookieConsent()

  const [showDetails, setShowDetails] = useState(false)
  const [selected, setSelected] = useState<CookieConsent>({
    necessary: true,
    functional: consent.functional,
    statistical: consent.statistical,
    marketing: consent.marketing,
  })

  if (!isBannerVisible) return null

  const acceptAll = () => {
    saveConsent({ necessary: true, functional: true, statistical: true, marketing: true })
  }

  const acceptNecessary = () => {
    saveConsent({ necessary: true, functional: false, statistical: false, marketing: false })
  }

  const saveSelected = () => {
    saveConsent({ ...selected, necessary: true })
  }

  const toggleCategory = (id: keyof CookieConsent) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className={styles['banner']}>
      {showDetails ? (
        <>
          <button
            className={styles['banner__close']}
            type="button"
            aria-label="Свернуть настройки"
            onClick={() => setShowDetails(false)}
          >
            ✕
          </button>

          <div className={styles['banner__categories']}>
            {COOKIE_CATEGORIES.map((category) => (
              <label key={category.id} className={styles['banner__category']}>
                <input
                  className="visually-hidden"
                  type="checkbox"
                  checked={category.required ? true : selected[category.id]}
                  disabled={category.required}
                  onChange={() => {
                    if (!category.required) toggleCategory(category.id)
                  }}
                />

                <div>
                  <span className={styles['banner__category-title']}>{category.label}</span>

                  <span className={styles['banner__category-description']}>
                    {category.description}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className={styles['banner__buttons']}>
            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={saveSelected}
            >
              Подтвердить выбор
            </button>

            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={acceptAll}
            >
              Принять все
            </button>

            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={acceptNecessary}
            >
              Принять необходимые
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles['banner__text']}>
            Мы используем файлы cookie для обеспечения работы сайта, анализа трафика и
            персонализации контента. Подробнее в нашей&nbsp;
            <Link href={cookiePolicyUrl} className={styles['banner__link']} target="_blank">
              Политике использования cookie
            </Link>
            .
          </p>

          <div className={styles['banner__buttons']}>
            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={acceptAll}
            >
              Принять все
            </button>

            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={acceptNecessary}
            >
              Принять необходимые
            </button>

            <button
              className={clsx('button button--accent', styles['banner__button'])}
              type="button"
              onClick={() => setShowDetails(true)}
            >
              Настроить параметры
            </button>
          </div>
        </>
      )}
    </div>
  )
}
