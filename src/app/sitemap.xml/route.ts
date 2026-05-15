import { NextResponse } from 'next/server'
import { fetchCollection } from '@/lib/api-client'
import type { WorkFromServer, NewsFromServer, CategoryFromServer } from '@/types/types'

type SitemapUrl = {
  loc: string
  lastmod?: string
  changefreq: string
  priority: number
}

export async function GET() {
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL

  const staticPages: SitemapUrl[] = [
    { loc: `${siteUrl}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${siteUrl}/about`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${siteUrl}/works`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${siteUrl}/in-stock`, changefreq: 'daily', priority: 0.9 },
    { loc: `${siteUrl}/contacts`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${siteUrl}/categories`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${siteUrl}/gallery`, changefreq: 'weekly', priority: 0.7 },
    { loc: `${siteUrl}/news`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${siteUrl}/reviews`, changefreq: 'weekly', priority: 0.7 },
    { loc: `${siteUrl}/order-delivery`, changefreq: 'monthly', priority: 0.8 },
  ]

  const urls: SitemapUrl[] = [...staticPages]

  try {
    const [works, news, categories, inStock] = await Promise.all([
      fetchCollection<WorkFromServer>('works'),
      fetchCollection<NewsFromServer>('news'),
      fetchCollection<CategoryFromServer>('category'),
      fetchCollection<WorkFromServer>('works', { filter: { in_stock: true } }),
    ])

    if (Array.isArray(works)) {
      works.forEach((w: WorkFromServer) => {
        if (w && (w.slug || w._id)) {
          urls.push({
            loc: `${siteUrl}/works/${w.slug || w._id}`,
            lastmod: w._modified ? new Date(w._modified * 1000).toISOString() : undefined,
            changefreq: 'monthly',
            priority: 0.7,
          })
        }
      })
    }

    if (Array.isArray(inStock)) {
      inStock.forEach((w: WorkFromServer) => {
        if (w && (w.slug || w._id)) {
          urls.push({
            loc: `${siteUrl}/in-stock/${w.slug || w._id}`,
            lastmod: w._modified ? new Date(w._modified * 1000).toISOString() : undefined,
            changefreq: 'daily',
            priority: 0.8,
          })
        }
      })
    }

    if (Array.isArray(news)) {
      news.forEach((n: NewsFromServer) => {
        if (n && (n.slug || n._id)) {
          urls.push({
            loc: `${siteUrl}/news/${n.slug || n._id}`,
            lastmod: n._modified ? new Date(n._modified * 1000).toISOString() : undefined,
            changefreq: 'monthly',
            priority: 0.6,
          })
        }
      })
    }

    if (Array.isArray(categories)) {
      categories.forEach((c: CategoryFromServer) => {
        if (c && (c.slug || c._id)) {
          urls.push({
            loc: `${siteUrl}/categories/${c.slug || c._id}`,
            lastmod: c._modified ? new Date(c._modified * 1000).toISOString() : undefined,
            changefreq: 'monthly',
            priority: 0.7,
          })
        }
      })
    }
  } catch (e) {
    console.error('Sitemap generation error:', e)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urls
                  .map(
                    (u) => `  <url>
                    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
                    <changefreq>${u.changefreq}</changefreq>
                    <priority>${u.priority}</priority>
                  </url>`,
                  )
                  .join('\n')}
                </urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
