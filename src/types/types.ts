export type PriceItem = {
  _id: string
  sort: number
  size: string
  without_gold: number
  all: number
  halo: number
  price_for_inch: boolean
}

export type MenuItem = {
  label: string
  href: string
}

export type CardItem = {
  id: number | string
  title: string
  description: string
  href: string
  image: string
  alt: string
}

export type ProcessItem = {
  _id: string
  title: string
  description: string
  image: ImageItem
  alt: string
}

export type ReviewItem = {
  id: number | string
  date: string
  stars: number
  name: string
  review: string
}

export type FaqItem = {
  id: number
  question: string
  answer: string
}

export type SlideItem = {
  id: string
  image: string
  alt: string
  href?: string
}

export type BreadcrumbItem = {
  title: string
  url?: string
}

export type ImageItem = {
  _id: string
  title: string
  alt: string
  width: string
  height: string
}

export type MainInfo = {
  title: string
  description: string
  logo: ImageItem
  image: ImageItem
  address: string
  coordinates: string
  email: string
  phone: string
  telegram: string
  whatsapp: string
  vk: string
  max: string
}

export type AdvantageItem = {
  _id: number
  title: string
  description: string
  icon: ImageItem
}

export type CategoryFromServer = {
  _id: string
  sort: number
  title: string
  description: string
  image: ImageItem
  slider: ImageItem[]
  slug?: string
  _created?: number
  _modified?: number
}

export type WorkFromServer = {
  _id: string
  title: string
  description: string
  image: ImageItem
  slider: ImageItem[]
  date: string
  master: MasterFromServer | null
  in_stock: boolean
  slug?: string
  _created?: number
  _modified?: number
}

export type NewsFromServer = {
  slider: ImageItem[]
  title: string
  description: string
  content: string
  image: ImageItem
  _id: string
  date: string
  slug?: string
  _created?: number
  _modified?: number
}

export type ReviewFromServer = {
  _id: string
  name: string
  review: string
  stars: number
  date: string
}

export type MasterFromServer = {
  _id: string
  name: string
  description: string
  image: ImageItem
  slug?: string
}

export type OrderFromServer = {
  _id: string
  description: string
}

export type GalleryTreeItem = {
  _id: string
  title: string
  slug: string
  type?: 'Категория' | 'Фото'
  image: ImageItem
  _children: GalleryTreeItem[]
}

export type GalleryItemForClient = {
  _id: string
  title: string
  slug: string
  fullPath: string
  type?: string
  imageUrl: string
  imageLargeUrl: string
  imageThumbUrl: string
  imageAlt: string
  hasNestedCategories: boolean
  childrenCount: number
  categoriesCount: number
  photosCount: number
  children: GalleryItemForClient[]
}

export type FaqFromServer = {
  _id: string
  question: string
  answer: string
}

export type RestorationFromServer = {
  _id: string
  title: string
  description: string
  image: ImageItem
}

export type MainSliderFromServer = {
  _id: string
  title?: string
  description?: string
  link?: string
  image: ImageItem
}
