import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

type CockpitSingletonOptions = {
  locale?: string
  populate?: number
}

/**
 * GET /api/content/singleton/[model]
 * Получение одиночного элемента (singleton)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> },
) {
  try {
    const { model } = await params
    const searchParams = request.nextUrl.searchParams

    const options: CockpitSingletonOptions = {}

    if (searchParams.get('locale')) {
      options.locale = searchParams.get('locale')!
    }

    if (searchParams.get('populate')) {
      options.populate = parseInt(searchParams.get('populate')!)
    }

    const data = await cockpit.getSingleItem(model, options)

    if (!data) {
      return Response.json({ error: 'Singleton not found' }, { status: 404 })
    }

    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[API] Error fetching singleton:', err)
    return Response.json({ error: 'Failed to fetch singleton' }, { status: 500 })
  }
}

export const revalidate = 3600
