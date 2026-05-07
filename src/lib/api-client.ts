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
  if (options.skip) params.set('skip', String(options.skip))
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
      cache: options.cache || 'force-cache',
      next: {
        revalidate: options.revalidate !== undefined ? options.revalidate : 3600,
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
  } catch (error) {
    console.error(`Error fetching singleton ${model}:`, error)
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
      cache: options.cache || 'force-cache',
      next: {
        revalidate: options.revalidate !== undefined ? options.revalidate : 3600,
        tags: options.tags || [`collection-${model}`],
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch collection ${model}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching collection ${model}:`, error)
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
      cache: options.cache || 'force-cache',
      next: {
        revalidate: options.revalidate !== undefined ? options.revalidate : 3600,
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
  } catch (error) {
    console.error(`Error fetching collection item ${model}/${id}:`, error)
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
      cache: options.cache || 'force-cache',
      next: {
        revalidate: options.revalidate !== undefined ? options.revalidate : 3600,
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
  } catch (error) {
    console.error(`Error fetching tree ${model}:`, error)
    return null
  }
}

/**
 * Получение ссылки на изображение
 * @param imageId - ID изображения
 * @param width - ширина
 * @param height - высота
 */
export function getImageUrl(imageId: string, width: number, height: number): string {
  const cockpitUrl = process.env.COCKPIT_API_URL || ''
  return `${cockpitUrl}api/assets/image/${imageId}?w=${width}&h=${height}&q=80&o=1`
}
