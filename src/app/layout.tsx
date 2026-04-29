import '../styles/globals.scss'
import '../styles/blocks.scss'
import { Montserrat, CyrillicOld } from './fonts'
import type { Metadata } from 'next'
import { JSX } from 'react'
import clsx from 'clsx'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ScrollButton from '@/components/ScrollButton/ScrollButton'

type LayoutProps = {
  children?: React.ReactNode
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
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //   },
  // },
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  return (
    <html lang="ru">
      <body className={clsx(Montserrat.variable, CyrillicOld.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Иконописная Артель',
              url: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
              logo: (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL) + '/logo.png',
            }),
          }}
        />

        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollButton />
      </body>
    </html>
  )
}
