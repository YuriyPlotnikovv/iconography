'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function AnimationObserver(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let observer: IntersectionObserver | null = null

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
  }, [pathname, searchParams])

  return null
}
