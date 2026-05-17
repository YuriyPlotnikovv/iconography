'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  JSX,
} from 'react'
import { CookieCategoryId, CookieConsent } from '@/types/types'

type CallbackRegistry = Map<CookieCategoryId, Set<() => void>>

type CookieConsentContextValue = {
  consent: CookieConsent
  saveConsent: (newConsent: CookieConsent) => void
  registerCallback: (type: CookieCategoryId, fn: () => void) => void
  isBannerVisible: boolean
  openBanner: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

type Props = {
  initialConsent: CookieConsent | null
  children: ReactNode
}

export function CookieConsentProvider({ initialConsent, children }: Props): JSX.Element {
  const defaultConsent: CookieConsent = {
    necessary: true,
    performance: false,
    functional: false,
    targeting: false,
  }

  const [consent, setConsent] = useState<CookieConsent>(initialConsent ?? defaultConsent)
  const [isBannerVisible, setIsBannerVisible] = useState(initialConsent === null)
  const callbackRegistry = useRef<CallbackRegistry>(new Map())
  const consentRef = useRef<CookieConsent>(consent)

  useEffect(() => {
    consentRef.current = consent
    const registry = callbackRegistry.current
    for (const [type, fns] of registry.entries()) {
      if (consent[type]) {
        fns.forEach((fn) => fn())
      }
    }
  }, [consent])

  const saveConsent = (newConsent: CookieConsent) => {
    const value = JSON.stringify({ ...newConsent, necessary: true })
    document.cookie = `cookie-consent=${encodeURIComponent(value)}; max-age=31536000; path=/; SameSite=Lax`
    setConsent({ ...newConsent, necessary: true })
    setIsBannerVisible(false)
  }

  const registerCallback = useCallback((type: CookieCategoryId, fn: () => void) => {
    const registry = callbackRegistry.current
    if (!registry.has(type)) {
      registry.set(type, new Set())
    }
    registry.get(type)!.add(fn)

    if (consentRef.current[type]) {
      fn()
    }
  }, [])

  const openBanner = () => setIsBannerVisible(true)

  return (
    <CookieConsentContext.Provider
      value={{ consent, saveConsent, registerCallback, isBannerVisible, openBanner }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider')
  return ctx
}
