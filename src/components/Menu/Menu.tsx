'use client'

import { JSX, RefObject } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import type { MenuItem } from '@/types/types'
import { MENU_ITEMS } from '@/const/const'
import menuStyles from './Menu.module.scss'

type MenuProps = {
  addClass?: string
  onCloseMenu?: () => void
  firstMenuItemRef?: RefObject<HTMLAnchorElement | null>
  isFooter?: boolean
}

export default function Menu({
  addClass,
  onCloseMenu,
  firstMenuItemRef,
  isFooter,
}: MenuProps): JSX.Element {
  const currentPath = usePathname()

  return (
    <ul className={clsx(addClass, menuStyles.menu)}>
      {MENU_ITEMS.map((menuItem: MenuItem, index) => {
        const isActive =
          menuItem.href === '/' ? currentPath === '/' : currentPath.startsWith(menuItem.href)

        return (
          <li className={menuStyles.menu__item} key={menuItem.href}>
            <Link
              className={clsx(
                menuStyles.menu__link,
                isActive && !isFooter && menuStyles['menu__link--current'],
              )}
              href={menuItem.href}
              onClick={onCloseMenu}
              ref={index === 0 ? firstMenuItemRef : null}
            >
              {menuItem.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
