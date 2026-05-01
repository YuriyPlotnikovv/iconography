import { GalleryTreeItem, GalleryItemForClient } from '@/types/types'
import cockpit from '@/lib/CockpitAPI'

/**
 * Подготовка данных галереи для клиентского компонента
 * Рекурсивно обходит дерево и создает объекты с подготовленными URL изображений
 */
export function prepareGalleryItems(items: GalleryTreeItem[]): GalleryItemForClient[] {
  return items.map((item) => {
    const hasNestedCategories = item._children.some((child) => child.type === 'Категория')
    const categoriesCount = item._children.filter((child) => child.type === 'Категория').length
    const photosCount = item._children.filter((child) => child.type !== 'Категория').length
    const childrenCount = hasNestedCategories ? categoriesCount : photosCount

    return {
      _id: item._id,
      title: item.title,
      slug: item.slug,
      type: item.type,
      imageUrl: cockpit.getImageUrl(item.image._id, 400, 400),
      imageLargeUrl: cockpit.getImageUrl(item.image._id, 1920, 1920),
      imageThumbUrl: cockpit.getImageUrl(item.image._id, 400, 400),
      imageAlt: item.image.title || item.title,
      hasNestedCategories,
      childrenCount,
      categoriesCount,
      photosCount,
      children: prepareGalleryItems(item._children),
    }
  })
}

/**
 * Поиск элемента галереи по slug
 * Рекурсивно ищет элемент в дереве
 */
export function findGalleryItemBySlug(
  items: GalleryTreeItem[],
  targetSlug: string,
): GalleryTreeItem | null {
  for (const item of items) {
    if (item.slug === targetSlug) {
      return item
    }

    if (item._children && item._children.length > 0) {
      const found = findGalleryItemBySlug(item._children, targetSlug)
      if (found) return found
    }
  }
  return null
}

/**
 * Построение breadcrumbs для галереи
 * Возвращает путь от корня до текущего элемента
 */
export function buildGalleryBreadcrumbs(
  items: GalleryTreeItem[],
  targetSlug: string,
  path: GalleryTreeItem[] = [],
): GalleryTreeItem[] | null {
  for (const item of items) {
    if (item.slug === targetSlug) {
      return [...path, item]
    }

    if (item._children && item._children.length > 0) {
      const found = buildGalleryBreadcrumbs(item._children, targetSlug, [...path, item])
      if (found) return found
    }
  }
  return null
}

