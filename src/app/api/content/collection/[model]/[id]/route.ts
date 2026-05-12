import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

type CockpitItemOptions = {
  locale?: string
  populate?: number
}

/**
 * GET /api/content/collection/[model]/[id]
 * Получение одиночного элемента коллекции по ID или по полю
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> },
) {
  try {
    const { model, id } = await params
    const searchParams = request.nextUrl.searchParams

    const options: CockpitItemOptions = {}

    if (searchParams.get('locale')) {
      options.locale = searchParams.get('locale')!
    }

    if (searchParams.get('populate')) {
      options.populate = parseInt(searchParams.get('populate')!)
    }

    const field = searchParams.get('field')

    let data: unknown

    if (field && field !== '_id') {
      data = await cockpit.getCollectionItemByField(model, field, id, options)
    } else {
      data = await cockpit.getCollectionItem(model, id, options)
    }

    if (!data) {
      return Response.json({ error: 'Item not found' }, { status: 404 })
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[API] Error fetching collection item:', err)
    return Response.json({ error: 'Failed to fetch collection item' }, { status: 500 })
  }
}

export const revalidate = 3600
