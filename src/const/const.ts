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
    label: 'Обязательные cookie',
    description: 'Обеспечивают базовую функциональность сайта',
    required: true,
  },
  {
    id: 'functional',
    label: 'Функциональные cookie',
    description:
      'Адаптируют сайт к предпочтениям пользователя: запоминают выбранный язык, размер шрифта, тему оформления',
    required: false,
  },
  {
    id: 'statistical',
    label: 'Статистические cookie',
    description:
      'Собирают данные о том, как пользователи используют сайт: какие страницы посещают, сколько времени проводят на них',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Маркетинговые cookie',
    description:
      'Отслеживают поведение пользователей на сайте для предоставления персонализированной рекламы',
    required: false,
  },
]
