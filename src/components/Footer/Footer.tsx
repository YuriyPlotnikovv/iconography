import { JSX } from 'react'
import footerStyles from './Footer.module.scss'
import clsx from 'clsx'
import Logo from '@/components/Logo/Logo'
import Social from '@/components/Social/Social'
import Menu from '@/components/Menu/Menu'
import Developer from '@/components/Developer/Developer'

export default function Footer(): JSX.Element {
  return (
    <footer className={footerStyles['footer']}>
      <div className={clsx('container', footerStyles['footer__container'])}>
        <Logo addClass={footerStyles['footer__logo']} />

        <Social addClass={footerStyles['footer__social']} />

        <nav className={footerStyles['footer__navigation']} aria-label="Дополнительная по сайту">
          <Menu addClass={footerStyles['footer__menu']} />
        </nav>

        <div className={footerStyles['footer__wrapper']}>
          <p className={footerStyles['footer__copyright']}>
            © Иконописная Артель, {new Date().getFullYear()}
          </p>

          <Developer addClass={footerStyles['footer__developer']} />
        </div>
      </div>
    </footer>
  )
}
