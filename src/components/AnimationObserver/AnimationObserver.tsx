'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnimationObserver(): null {
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    // rAF ensures DOM has fully updated after Next.js navigation
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>('[data-animate]:not(.is-visible)')

      if (!elements.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            const el = entry.target as HTMLElement
            const stagger = el.dataset.stagger

            if (stagger) {
              el.style.setProperty('--stagger', stagger)
            }

            el.classList.add('is-visible')
            observer?.unobserve(el)
          })
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px',
        },
      )

      elements.forEach((el) => observer!.observe(el))
    })

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
