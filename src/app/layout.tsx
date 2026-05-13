import '../styles/globals.scss'
import '../styles/blocks.scss'
import { Montserrat, CyrillicOld } from './fonts'
import type { Metadata } from 'next'
import { JSX, ReactNode } from 'react'
import clsx from 'clsx'
import Script from 'next/script'
import { cookies } from 'next/headers'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ScrollButton from '@/components/ScrollButton/ScrollButton'
import AnimationObserver from '@/components/AnimationObserver/AnimationObserver'
import PageTransition from '@/components/PageTransition/PageTransition'
import { CookieConsentProvider } from '@/context/CookieConsentContext'
import CookieBanner from '@/components/CookieBanner/CookieBanner'
import ServicesInit from '@/components/ServicesInit/ServicesInit'
import { CookieConsent } from '@/types/types'

export const dynamic = 'force-dynamic'

type LayoutProps = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Иконописная Артель',
    template: '%s | Иконописная Артель',
  },
  description:
    'Рукописные канонические иконы — храмы, семейные иконы и реставрация. Закажите у мастеров-иконописцев.',
  keywords: ['иконописная', 'иконы на заказ', 'реставрация икон', 'иконописцы'],
  authors: [{ name: 'Иконописная Артель' }],
  openGraph: {
    title: 'Иконописная Артель',
    description: 'Рукописные канонические иконы — храмы, семейные иконы и реставрация',
    url: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Иконописная Артель',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Иконописная Артель' }],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Иконописная Артель',
    description: 'Рукописные канонические иконы',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    other: [{ rel: 'manifest', url: '/manifest.json' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'llms-txt': '/llms.txt',
    'llms-full': '/llms-full.txt',
  },
}

export default async function RootLayout({ children }: LayoutProps): Promise<JSX.Element> {
  const cookieStore = await cookies()
  const raw = cookieStore.get('cookie-consent')?.value
  let initialConsent: CookieConsent | null = null
  if (raw) {
    try {
      initialConsent = JSON.parse(decodeURIComponent(raw)) as CookieConsent
    } catch {
      initialConsent = null
    }
  }

  return (
    <html lang="ru">
      <body className={clsx(Montserrat.variable, CyrillicOld.variable)}>
        <CookieConsentProvider initialConsent={initialConsent}>
          <Script
            src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`}
            strategy="beforeInteractive"
          />

          <Script
            src="https://smartcaptcha.cloud.yandex.ru/captcha.js?render=onload&onload=onloadFunction"
            strategy="beforeInteractive"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Иконописная Артель',
                url: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
                logo: (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL) + '/logo.png',
                description:
                  'Рукописные канонические иконы — храмы, семейные иконы и реставрация. Мастера-иконописцы.',
              }),
            }}
          />

          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />

          <ScrollButton />
          <AnimationObserver />
          <CookieBanner />
          <ServicesInit />
        </CookieConsentProvider>
      </body>
    </html>
  )
}
