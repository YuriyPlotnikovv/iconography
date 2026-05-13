import { NextRequest } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

const DOCUMENT_TITLES: Record<string, string> = {
  agreement: 'Согласие на обработку персональных данных - Иконописная Артель',
  policy: 'Политика обработки персональных данных - Иконописная Артель',
  cookie: 'Политика использования файлов cookie - Иконописная Артель',
}

/**
 * GET /api/documents/[type]
 * Возвращает PDF-документ из maininfo с читаемым именем файла в заголовке,
 * чтобы браузер показывал его как заголовок вкладки.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params

  if (!DOCUMENT_TITLES[type]) {
    return new Response('Not Found', { status: 404 })
  }

  const mainInfo = await cockpit.getSingleItem('maininfo')

  if (!mainInfo) {
    return new Response('Not Found', { status: 404 })
  }

  const asset = (mainInfo as Record<string, unknown>)[type] as { path?: string } | undefined

  if (!asset?.path) {
    return new Response('Not Found', { status: 404 })
  }

  const cockpitUrl = (process.env.COCKPIT_API_URL || '').replace(/\/$/, '')
  const fileUrl = `${cockpitUrl}/storage/uploads${asset.path}`

  let fileResponse: Response
  try {
    fileResponse = await fetch(fileUrl)
  } catch {
    return new Response('Failed to fetch document', { status: 502 })
  }

  if (!fileResponse.ok) {
    return new Response('Document not found', { status: 404 })
  }

  const contentType = fileResponse.headers.get('Content-Type') || 'application/pdf'
  const ext = asset.path.split('.').pop() || 'pdf'
  const filename = `${DOCUMENT_TITLES[type]}.${ext}`
  const encodedFilename = encodeURIComponent(filename)

  return new Response(fileResponse.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
