import { NextResponse } from 'next/server'
import cockpit from '@/lib/CockpitAPI'

export async function GET() {
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL

  const staticPages = [
    '/',
    '/news',
    '/works',
    '/in-stock',
    '/contacts',
    '/categories',
    '/gallery',
    '/reviews',
    '/order-delivery',
  ]

  const urls: string[] = staticPages.map((p) => `${siteUrl}${p}`)

  try {
    const [works, news, categories] = await Promise.all([
      cockpit.getCollection('works'),
      cockpit.getCollection('news'),
      cockpit.getCollection('category'),
    ])

    if (Array.isArray(works)) {
      works.forEach((w: unknown) => {
        const item = w as { _id?: string }
        if (item && item._id) urls.push(`${siteUrl}/works/${item._id}`)
      })
    }

    if (Array.isArray(news)) {
      news.forEach((n: unknown) => {
        const item = n as { _id?: string }
        if (item && item._id) urls.push(`${siteUrl}/news/${item._id}`)
      })
    }

    if (Array.isArray(categories)) {
      categories.forEach((c: unknown) => {
        const item = c as { _id?: string }
        if (item && item._id) urls.push(`${siteUrl}/categories/${item._id}`)
      })
    }
  } catch (e) {
    // If Cockpit is unavailable, still return sitemap with static pages
    console.error('Sitemap generation error:', e)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
    .join('\n')}\n</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}


