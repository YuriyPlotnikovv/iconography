import { JSX } from 'react'
import galleryPageStyles from './GalleryPage.module.scss'

type GalleryBadgeProps = {
  categoriesCount: number
  photosCount: number
}

/**
 * Получает правильное склонение для слова "раздел"
 */
function getCategoriesLabel(count: number): string {
  if (count === 1) return 'раздел'
  if (count < 5) return 'раздела'
  return 'разделов'
}

/**
 * Компонент бейджа для отображения количества разделов и фото в категории галереи
 */
export default function GalleryBadge({ categoriesCount, photosCount }: GalleryBadgeProps): JSX.Element | null {
  if (categoriesCount === 0 && photosCount === 0) {
    return null
  }

  let badgeText = ''

  if (categoriesCount > 0 && photosCount > 0) {
    badgeText = `${categoriesCount} ${getCategoriesLabel(categoriesCount)}, ${photosCount} фото`
  } else if (categoriesCount > 0) {
    badgeText = `${categoriesCount} ${getCategoriesLabel(categoriesCount)}`
  } else {
    badgeText = `${photosCount} фото`
  }

  return <div className={galleryPageStyles['gallery__badge']}>{badgeText}</div>
}

