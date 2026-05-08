import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * POST /api/revalidate
 * Эндпоинт для ревалидации кеша Next.js по тегам, связанным с моделями данных.
 *
 * Пример запроса:
 * curl -X POST http://localhost:3000/api/revalidate \
 *      -H "Content-Type: application/json" \
 *      -H "x-webhook-secret: your_secret_here" \
 *      -d '{"model": "news"}'
 *
 * В ответ возвращает JSON с результатом ревалидации.
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-webhook-secret')
    const expectedSecret = process.env.REVALIDATE_SECRET

    if (!expectedSecret) {
      console.error('REVALIDATE_SECRET is not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (secret !== expectedSecret) {
      console.warn('Invalid webhook secret received')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { model } = body

    if (!model) {
      return NextResponse.json({ error: 'Model parameter is required' }, { status: 400 })
    }

    const modelTagMap: Record<string, string[]> = {
      // Collections
      news:          ['collection-news'],
      works:         ['collection-works'],
      reviews:       ['collection-reviews'],
      category:      ['collection-category'],
      faq:           ['collection-faq'],
      advantages:    ['collection-advantages'],
      createprocess: ['collection-createprocess'],
      restoration:   ['singleton-restoration'],
      masters:       ['collection-masters'],
      mainslider:    ['collection-mainslider'],
      // Singletons
      maininfo:      ['singleton-maininfo'],
      order:         ['singleton-order'],
      // Trees
      gallery:       ['tree-gallery'],
    }

    const tagsToRevalidate = modelTagMap[model] || []

    if (tagsToRevalidate.length === 0) {
      return NextResponse.json({ error: `Unknown model: ${model}` }, { status: 400 })
    }

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      tags: tagsToRevalidate,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
