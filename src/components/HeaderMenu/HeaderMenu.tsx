'use client'

import { JSX, useState, useEffect, useRef } from 'react'
import headerMenuStyles from './HeaderMenu.module.scss'
import clsx from 'clsx'
import Menu from '@/components/Menu/Menu'

export default function HeaderMenu(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMenuButtonClick = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
      if (isMenuOpen) {
        htmlElement.classList.add('fixed')

        if (firstMenuItemRef.current) {
          firstMenuItemRef.current.focus()
        }
      } else {
        htmlElement.classList.remove('fixed')
      }
    }

    return () => {
      if (htmlElement) {
        htmlElement.classList.remove('fixed')
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <>
      <button
        ref={buttonRef}
        className={clsx(
          headerMenuStyles['menu-button'],
          isMenuOpen && headerMenuStyles['menu-button--menu-open'],
        )}
        type="button"
        aria-label="Открыть/закрыть меню"
        onClick={handleMenuButtonClick}
      >
        <span className={headerMenuStyles['menu-button-line']}></span>
        <span className={headerMenuStyles['menu-button-line']}></span>
        <span className={headerMenuStyles['menu-button-line']}></span>
      </button>

      <nav
        ref={menuRef}
        className={clsx(
          headerMenuStyles['navigation'],
          isMenuOpen && headerMenuStyles['navigation--open'],
        )}
        aria-label="Основная по сайту"
      >
        <Menu
          addClass={headerMenuStyles['menu']}
          onCloseMenu={closeMenu}
          firstMenuItemRef={firstMenuItemRef}
        />
      </nav>
    </>
  )
}
