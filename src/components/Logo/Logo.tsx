import { JSX } from 'react'
import logoStyles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { MainInfoFromServer } from '@/types/types'
import { fetchSingleton, getImageUrl } from '@/lib/api-client'
import clsx from 'clsx'

type LogoProps = {
  addClass?: string
  isFooter?: boolean
}

export default async function Logo({ addClass, isFooter }: LogoProps): Promise<JSX.Element | null> {
  const mainInfo: MainInfoFromServer | null = await fetchSingleton('maininfo')

  if (!mainInfo || !mainInfo.logo) {
    return null
  }

  const logo = getImageUrl(mainInfo.logo._id, 60, 60)
  const title = mainInfo.title ?? ''

  return (
    <Link
      className={clsx(addClass, logoStyles['logo'], isFooter && logoStyles['logo--footer'])}
      href="/"
    >
      <Image
        className={logoStyles['logo__image']}
        src={logo}
        width="60"
        height="60"
        unoptimized
        alt={mainInfo.logo.alt ?? title}
      />
      {title && <span className={logoStyles['logo__text']}>{title}</span>}
    </Link>
  )
}
