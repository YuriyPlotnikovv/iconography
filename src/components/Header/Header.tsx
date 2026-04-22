import { JSX } from 'react'
import clsx from 'clsx'
import Logo from '@/components/Logo/Logo'
import Contacts from '@/components/Contacts/Contacts'
import Address from '@/components/Address/Address'
import Social from '@/components/Social/Social'
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu'
import headerStyles from './Header.module.scss'

export default function Header(): JSX.Element {
  return (
    <header className={headerStyles['header']}>
      <div className={clsx('container', headerStyles['header__container'])}>
        <Logo showCaption={true} />

        <Contacts addClass={headerStyles['header__contacts']} />

        <Address />

        <Social />

        <HeaderMenu />
      </div>
    </header>
  )
}
