import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

type CockpitCollectionOptions = {
  locale?: string
  filter?: Record<string, unknown>
  sort?: Record<string, number>
  limit?: number
  skip?: number
  populate?: number
}

/**
 * GET /api/content/collection/[model]
 * Получение элементов коллекции
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> },
) {
  try {
    const { model } = await params
    const searchParams = request.nextUrl.searchParams
    const options: CockpitCollectionOptions = {}

    if (searchParams.get('locale')) {
      options.locale = searchParams.get('locale')!
    }

    if (searchParams.get('filter')) {
      try {
        options.filter = JSON.parse(searchParams.get('filter')!)
      } catch (err) {
        console.error('Invalid filter JSON:', err)
      }
    }

    if (searchParams.get('sort')) {
      try {
        options.sort = JSON.parse(searchParams.get('sort')!)
      } catch (err) {
        console.error('Invalid sort JSON:', err)
      }
    }

    if (searchParams.get('limit')) {
      options.limit = parseInt(searchParams.get('limit')!)
    }

    if (searchParams.get('skip')) {
      options.skip = parseInt(searchParams.get('skip')!)
    }

    if (searchParams.get('populate')) {
      options.populate = parseInt(searchParams.get('populate')!)
    }

    const data = await cockpit.getCollection(model, options)

    const entries: unknown[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : []

    return Response.json(entries, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[API] Error fetching collection:', err)
    return Response.json({ error: 'Failed to fetch collection' }, { status: 500 })
  }
}

export const revalidate = 3600
