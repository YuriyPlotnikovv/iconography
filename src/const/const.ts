import { CookieCategoryId, MenuItem } from '@/types/types'

export const ITEMS_PER_PAGE = 12
export const REVIEWS_PER_PAGE = 1

export const SCROLL_THRESHOLD = 500

export const STARS_COUNT = 5
export const MAX_PHOTOS = 5

export const DEFAULT_MAX_FILES = 5
export const DEFAULT_MAX_SIZE_MB = 5

export const GOLD_TYPE_OPTIONS = [
  { value: 'without_gold', label: 'Без золота' },
  { value: 'all', label: 'Золотой фон и нимб' },
  { value: 'halo', label: 'Только нимб' },
] as const

export const GALLERY_BREAKPOINT_COLUMNS = {
  default: 4,
  1200: 3,
  768: 2,
  480: 1,
}

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

export const ANCHOR_LINKS: MenuItem[] = [
  {
    label: 'Наши мастера',
    href: '#masters',
  },
  {
    label: 'Процесс сотворения образа',
    href: '#process',
  },
  {
    label: 'Категории икон',
    href: '#categories',
  },
  {
    label: 'Расчёт стоимости',
    href: '#calculation',
  },
  {
    label: 'Реставрация',
    href: '#restoration',
  },
  {
    label: 'Вопрос-ответ',
    href: '#faq',
  },
]

export const COOKIE_CATEGORIES: {
  id: CookieCategoryId
  label: string
  description: string
  required: boolean
}[] = [
  {
    id: 'necessary',
    label: 'Строго необходимые cookies',
    description:
      'Необходимы для работы сайта и не могут быть отключены. Не хранят личную информацию.',
    required: true,
  },
  {
    id: 'performance',
    label: 'Cookies производительности',
    description:
      'Собирают анонимную статистику посещений для улучшения работы сайта.',
    required: false,
  },
  {
    id: 'functional',
    label: 'Функциональные cookies',
    description:
      'Запоминают ваши настройки и предпочтения для персонализации сайта.',
    required: false,
  },
  {
    id: 'targeting',
    label: 'Целевые и аналитические cookies',
    description:
      'Используются для показа релевантной рекламы на основе ваших интересов.',
    required: false,
  },
]
