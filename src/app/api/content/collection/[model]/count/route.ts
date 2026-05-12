import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

/**
 * GET /api/content/collection/[model]/count
 * Возвращает общее количество записей в коллекции
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> },
) {
  try {
    const { model } = await params
    const searchParams = request.nextUrl.searchParams
    const options: { filter?: Record<string, unknown> } = {}

    if (searchParams.get('filter')) {
      try {
        options.filter = JSON.parse(searchParams.get('filter')!)
      } catch (err) {
        console.error('Invalid filter JSON:', err)
      }
    }

    const data = await cockpit.getCollection(model, options)

    let count = 0
    if (Array.isArray(data)) {
      count = data.length
    } else if (typeof data?.meta?.total === 'number') {
      count = data.meta.total
    } else if (Array.isArray(data?.data)) {
      count = data.data.length
    }

    return Response.json(
      { count },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (err) {
    console.error('[API] Error counting collection:', err)
    return Response.json({ error: 'Failed to count collection' }, { status: 500 })
  }
}

export const revalidate = 3600
