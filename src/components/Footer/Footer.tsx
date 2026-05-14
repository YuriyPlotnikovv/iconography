import { JSX } from 'react'
import footerStyles from './Footer.module.scss'
import clsx from 'clsx'
import Logo from '@/components/Logo/Logo'
import Social from '@/components/Social/Social'
import Menu from '@/components/Menu/Menu'
import Developer from '@/components/Developer/Developer'
import Link from 'next/link'

export default function Footer(): JSX.Element {
  return (
    <footer className={footerStyles['footer']}>
      <div className={clsx('container', footerStyles['footer__container'])}>
        <div className={footerStyles['footer__logo']} data-animate="fade-up" data-stagger="0">
          <Logo isFooter={true} />
        </div>

        <div className={footerStyles['footer__social']} data-animate="fade-up" data-stagger="1">
          <Social />
        </div>

        <nav
          className={footerStyles['footer__navigation']}
          aria-label="Дополнительная по сайту"
          data-animate="fade-up"
          data-stagger="2"
        >
          <Menu addClass={footerStyles['footer__menu']} isFooter={true} />
        </nav>

        <div className={footerStyles['footer__wrapper']} data-animate="fade-up" data-stagger="3">
          <p className={footerStyles['footer__copyright']}>
            © Иконописная Артель, {new Date().getFullYear()}
          </p>

          <Link
            className={footerStyles['footer__policy']}
            href="/api/documents/policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Политика обработки персональных данных
          </Link>

          <Developer addClass={footerStyles['footer__developer']} />
        </div>
      </div>
    </footer>
  )
}
