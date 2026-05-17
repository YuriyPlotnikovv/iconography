'use client'
import { useEffect, JSX } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function ServicesInit(): JSX.Element | null {
  const { registerCallback } = useCookieConsent()

  useEffect(() => {
    registerCallback('performance', () => {
      // Placeholder for performance
      console.log('[CookieConsent] Performance callbacks initialized')
    })

    registerCallback('targeting', () => {
      // Placeholder for targeting
      console.log('[CookieConsent] Targeting callbacks initialized')
    })

    registerCallback('functional', () => {
      // Placeholder for functional
      console.log('[CookieConsent] Functional callbacks initialized')
    })
  }, [registerCallback])

  return null
}
