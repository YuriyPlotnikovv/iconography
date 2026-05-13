interface CockpitOptions {
  locale?: string
  filter?: Record<string, unknown>
  sort?: Record<string, number>
  limit?: number
  skip?: number
  populate?: number
}

class CockpitClient {
  private readonly baseUrl: string
  private readonly apiKey: string

  constructor() {
    this.baseUrl = process.env.COCKPIT_API_URL || ''
    this.apiKey = process.env.COCKPIT_API_KEY || ''
  }

  async getSingleItem(modelId: string, options: CockpitOptions = {}) {
    const query = this.createQueryString(options)
    const endpoint = `content/item/${modelId}${query}`

    try {
      return await this.cockpitFetch(endpoint)
    } catch (err) {
      console.error('[Cockpit] getSingleItem error', err)
      return null
    }
  }

  async getCollection(modelId: string, options: CockpitOptions = {}) {
    const query = this.createQueryString(options)
    const endpoint = `content/items/${modelId}${query}`

    try {
      return await this.cockpitFetch(endpoint)
    } catch (err) {
      console.error('[Cockpit] getCollection error', err)
      return []
    }
  }

  async getCollectionItem(modelId: string, elementId: string, options: CockpitOptions = {}) {
    const query = this.createQueryString(options)
    const endpoint = `content/item/${modelId}/${elementId}${query}`

    try {
      return await this.cockpitFetch(endpoint)
    } catch (err) {
      console.error('[Cockpit] getCollectionItem error', err)
      return null
    }
  }

  async getCollectionItemByField(
    modelId: string,
    field: string,
    value: string,
    options: CockpitOptions = {},
  ) {
    try {
      const filter = { ...(options.filter || {}), [field]: value }
      const items: unknown[] = await this.getCollection(modelId, { ...options, filter, limit: 1 })

      if (Array.isArray(items) && items.length > 0) return items[0]
      return null
    } catch (err) {
      console.error('[Cockpit] getCollectionItemByField error', err)
      return null
    }
  }

  async getTree(modelId: string, options: CockpitOptions = {}) {
    const query = this.createQueryString(options)
    const endpoint = `content/tree/${modelId}${query}`

    try {
      return await this.cockpitFetch(endpoint)
    } catch (err) {
      console.error('[Cockpit] getTree error', err)
      return null
    }
  }

  async createItem(modelId: string, data: Record<string, unknown>) {
    const endpoint = `content/item/${modelId}`

    try {
      return await this.cockpitFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ data }),
      })
    } catch (err) {
      console.error(`[Cockpit] createItem error in ${modelId}:`, err)
      return null
    }
  }

  private async uploadSingleAsset(
    file: File,
    folder?: string | null,
  ): Promise<Record<string, unknown> | null> {
    const formData = new FormData()

    formData.append('file', file, file.name)

    try {
      const url =
        `${this.baseUrl.replace(/\/$/, '')}/api/upload` + (folder ? `?folder=${folder}` : '')

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'api-key': this.apiKey },
        body: formData,
      })

      if (!response.ok) {
        console.error(`[Cockpit] uploadSingleAsset error: ${response.statusText}`)
        return null
      }

      const result = await response.json()
      const assets = result?.asset?.assets as Array<Record<string, unknown>> | undefined

      if (Array.isArray(assets) && assets.length > 0) return assets[0]

      return null
    } catch (err) {
      console.error(`[Cockpit] uploadSingleAsset error for "${file.name}":`, err)
      return null
    }
  }

  async uploadAssets(files: File[], folder?: string | null): Promise<Record<string, unknown>[]> {
    const assets: Record<string, unknown>[] = []

    for (const file of files) {
      const asset = await this.uploadSingleAsset(file, folder)
      if (asset) {
        assets.push(asset)
      }
    }

    return assets
  }

  getImageUrl(imageId: string, width: number, height: number) {
    return `${this.baseUrl}api/assets/image/${imageId}?w=${width}&h=${height}&q=80&o=1`
  }

  private createQueryString(options: CockpitOptions = {}) {
    const params = new URLSearchParams()

    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
      }
    })

    const query = params.toString()

    return query ? `?${query}` : ''
  }

  private async cockpitFetch(endpoint: string, options: RequestInit = {}) {
    if (!this.baseUrl) {
      throw new Error('[Cockpit] base URL is not configured. Set COCKPIT_API_URL in environment')
    }

    const url = `${this.baseUrl.replace(/\/$/, '')}/api/${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`[Cockpit] error: ${response.statusText}`)
    }

    return response.json()
  }
}

const cockpit = new CockpitClient()
export default cockpit
