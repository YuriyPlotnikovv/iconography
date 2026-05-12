'use client'

import React, { JSX, MouseEventHandler, useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import scrollButtonStyles from './ScrollButton.module.scss'
import { SCROLL_THRESHOLD } from '@/const/const'

export default function ScrollButton(): JSX.Element {
  const [visible, setVisible] = useState(false)
  const tickingRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true

      window.requestAnimationFrame(() => {
        const y =
          window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
        setVisible(y > SCROLL_THRESHOLD)
        tickingRef.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault()

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Прокрутить наверх"
      title="Наверх"
      className={clsx(
        scrollButtonStyles['scroll-button'],
        visible && scrollButtonStyles['scroll-button-show'],
      )}
      onClick={handleClick}
    >
      ↑
    </button>
  )
}
