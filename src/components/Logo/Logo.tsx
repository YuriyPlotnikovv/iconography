import { JSX } from 'react'
import logoStyles from './Logo.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { MainInfo } from '@/types/types'
import cockpit from '@/lib/CockpitAPI'
import clsx from 'clsx'

type LogoProps = {
  addClass?: string
}

export default async function Logo({ addClass }: LogoProps): Promise<JSX.Element | null> {
  const mainInfo: MainInfo | null = await cockpit.getSingleItem('maininfo')

  if (!mainInfo || !mainInfo.logo) {
    return null
  }

  const logo = cockpit.getImageUrl(mainInfo.logo._id, 60, 60)

  return (
    <Link className={clsx(addClass, logoStyles['logo'])} href="/">
      <Image
        className={logoStyles['logo__image']}
        src={logo}
        width="60"
        height="60"
        unoptimized
        alt={mainInfo.logo.alt ?? ''}
      />
    </Link>
  )
}
