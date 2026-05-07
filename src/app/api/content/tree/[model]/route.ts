import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

type CockpitTreeOptions = {
  locale?: string
  populate?: number
}

/**
 * GET /api/content/tree/[model]
 * Получение элементов дерева (tree)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> },
) {
  try {
    const { model } = await params
    const searchParams = request.nextUrl.searchParams

    const options: CockpitTreeOptions = {}

    if (searchParams.get('locale')) {
      options.locale = searchParams.get('locale')!
    }

    if (searchParams.get('populate')) {
      options.populate = parseInt(searchParams.get('populate')!)
    }

    const data = await cockpit.getTree(model, options)

    if (!data) {
      return Response.json({ error: 'Tree not found' }, { status: 404 })
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[API] Error fetching tree:', err)
    return Response.json({ error: 'Failed to fetch tree' }, { status: 500 })
  }
}

export const revalidate = 3600
