import type { ImageOptions } from '@/types/types'

/**
 * API Client
 */

interface FetchOptions {
  locale?: string
  filter?: Record<string, unknown>
  sort?: Record<string, number>
  limit?: number
  skip?: number
  populate?: number
  field?: string
  cache?: RequestCache
  revalidate?: number | false
  tags?: string[]
}

/**
 * Базовый URL для API запросов
 * @returns базовый URL
 */
function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_URL || 'http://localhost:3000'
  }

  return window.location.origin
}

/**
 * Построение URL с учетом опций запроса
 * @param path - путь на сервере
 * @param options - параметры запроса
 * @returns полный URL
 */
function buildUrl(path: string, options: FetchOptions = {}): string {
  const params = new URLSearchParams()

  if (options.locale) params.set('locale', options.locale)
  if (options.filter) params.set('filter', JSON.stringify(options.filter))
  if (options.sort) params.set('sort', JSON.stringify(options.sort))
  if (options.limit) params.set('limit', String(options.limit))
  if (options.skip !== undefined && options.skip !== null) params.set('skip', String(options.skip))
  if (options.populate) params.set('populate', String(options.populate))
  if (options.field) params.set('field', options.field)

  const queryString = params.toString()
  const baseUrl = getBaseUrl()
  const fullPath = `${baseUrl}/api${path}`

  return queryString ? `${fullPath}?${queryString}` : fullPath
}

/**
 * Получение одиночного элемента (singleton)
 * @param model - Название модели (например, 'settings', 'about')
 * @param options - Опции запроса (locale, populate и т.д.)
 * @returns Одиночный элемент или null
 *
 * @example
 * const settings = await fetchSingleton('settings')
 */
export async function fetchSingleton<T = unknown>(
  model: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const url = buildUrl(`/content/singleton/${model}`, options)

  try {
    const response = await fetch(url, {
      cache: options.cache ?? 'force-cache',
      next: {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        tags: options.tags || [`singleton-${model}`],
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch singleton ${model}: ${response.statusText}`)
    }

    return await response.json()
  } catch (err) {
    console.error(`Error fetching singleton ${model}:`, err)
    return null
  }
}

/**
 * Получение коллекции
 * @param model - Название модели (например, 'works')
 * @param options - Опции запроса (locale, populate и т.д.)
 * @returns Массив элементов или []
 *
 * @example
 * const works = await fetchCollection('works')
 */
export async function fetchCollection<T = unknown>(
  model: string,
  options: FetchOptions = {},
): Promise<T[]> {
  const url = buildUrl(`/content/collection/${model}`, options)

  try {
    const response = await fetch(url, {
      cache: options.cache ?? 'force-cache',
      next: {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        tags: options.tags || [`collection-${model}`],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch collection ${model}: ${response.statusText}`)
    }

    return await response.json()
  } catch (err) {
    console.error(`Error fetching collection ${model}:`, err)
    return []
  }
}

/**
 * Получение элемента коллекции
 * @param model - Название модели (например, 'works')
 * @param id - ID элемента или slug
 * @param options - Опции запроса (locale, populate и т.д.)
 * @returns Элемент или null
 *
 * @example
 * const work = await fetchCollectionItem('works', '12345')
 * const work = await fetchCollectionItem('works', 'work-item')
 */
export async function fetchCollectionItem<T = unknown>(
  model: string,
  id: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const url = buildUrl(`/content/collection/${model}/${id}`, options)

  try {
    const response = await fetch(url, {
      cache: options.cache ?? 'force-cache',
      next: {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        tags: options.tags || [`collection-${model}-${id}`],
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch collection item ${model}/${id}: ${response.statusText}`)
    }

    return await response.json()
  } catch (err) {
    console.error(`Error fetching collection item ${model}/${id}:`, err)
    return null
  }
}

/**
 * Получение дерева (tree)
 * @param model - Название модели (например, 'gallery')
 * @param options - Опции запроса (locale, populate и т.д.)
 * @returns Дерево или null
 *
 * @example
 * const menu = await fetchTree('gallery')
 */
export async function fetchTree<T = unknown>(
  model: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const url = buildUrl(`/content/tree/${model}`, options)

  try {
    const response = await fetch(url, {
      cache: options.cache ?? 'force-cache',
      next: {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        tags: options.tags || [`tree-${model}`],
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch tree ${model}: ${response.statusText}`)
    }

    return await response.json()
  } catch (err) {
    console.error(`Error fetching tree ${model}:`, err)
    return null
  }
}

/**
 * Получение количества записей в коллекции
 * @param model - Название модели
 * @param options - Опции запроса (filter, cache, revalidate, tags)
 * @returns Общее количество записей
 */
export async function fetchCollectionCount(
  model: string,
  options: Pick<FetchOptions, 'filter' | 'cache' | 'revalidate' | 'tags'> = {},
): Promise<number> {
  const params = new URLSearchParams()

  if (options.filter) params.set('filter', JSON.stringify(options.filter))

  const baseUrl = getBaseUrl()
  const queryString = params.toString()
  const url = `${baseUrl}/api/content/collection/${model}/count${queryString ? `?${queryString}` : ''}`

  try {
    const response = await fetch(url, {
      cache: options.cache ?? 'force-cache',
      next: {
        ...(options.revalidate !== undefined && { revalidate: options.revalidate }),
        tags: options.tags || [`collection-${model}-count`],
      },
    })

    if (!response.ok) return 0

    const data = await response.json()
    return data.count ?? 0
  } catch (err) {
    console.error(`Error fetching collection count ${model}:`, err)
    return 0
  }
}

/**
 * Получение ссылки на изображение
 * @param imageId - ID изображения
 * @param width - ширина
 * @param height - высота
 * @param options - опции ресайза
 * @param options.mode - режим ресайза (по умолчанию 'thumbnail')
 * @param options.mime - формат изображения (по умолчанию 'webp')
 * @param options.quality - качество от 1 до 100 (по умолчанию 90)
 */
export function getImageUrl(
  imageId: string,
  width: number,
  height: number,
  options: ImageOptions = {},
): string {
  const { mode = 'thumbnail', mime = 'webp', quality = 90 } = options
  const cockpitUrl = process.env.COCKPIT_API_URL || ''
  return `${cockpitUrl}api/assets/image/${imageId}?w=${width}&h=${height}&q=${quality}&o=1&mime=${mime}&m=${mode}`
}

/**
 * Получение ссылки на файл
 * @param path - путь к файлу из объекта ассета (поле path)
 */
export function getAssetUrl(path: string): string {
  const cockpitUrl = process.env.COCKPIT_API_URL || ''
  return `${cockpitUrl}storage/uploads${path}`
}
