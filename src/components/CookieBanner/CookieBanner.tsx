import { JSX } from 'react'
import CookieBannerClient from './CookieBannerClient'

export default function CookieBanner(): JSX.Element {
  return <CookieBannerClient cookiePolicyUrl="/api/documents/cookie" />
}
