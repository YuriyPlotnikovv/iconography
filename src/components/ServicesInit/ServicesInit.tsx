'use client'
import { useEffect, JSX } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function ServicesInit(): JSX.Element | null {
  const { registerCallback } = useCookieConsent()

  useEffect(() => {
    registerCallback('statistical', () => {
      // Placeholder for statistical
      console.log('[CookieConsent] Statistical callbacks initialized')
    })

    registerCallback('marketing', () => {
      // Placeholder for marketing
      console.log('[CookieConsent] Marketing callbacks initialized')
    })

    registerCallback('functional', () => {
      // Placeholder for functional
      console.log('[CookieConsent] Functional callbacks initialized')
    })
  }, [registerCallback])

  return null
}
