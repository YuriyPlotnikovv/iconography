import { MenuItem } from '@/types/types'

export const ITEMS_PER_PAGE = 12
export const REVIEWS_PER_PAGE = 1

export const MENU_ITEMS: MenuItem[] = [
  {
    href: '/about',
    label: 'О нас',
  },
  {
    href: '/news',
    label: 'Новости',
  },
  {
    href: '/reviews',
    label: 'Отзывы',
  },
  {
    href: '/gallery',
    label: 'Галерея',
  },
  {
    href: '/works',
    label: 'Наши работы',
  },
  {
    href: '/in-stock',
    label: 'Рукописные иконы в наличии',
  },
  {
    href: '/order-delivery',
    label: 'Заказ и доставка',
  },
  {
    href: '/contacts',
    label: 'Контакты',
  },
]
