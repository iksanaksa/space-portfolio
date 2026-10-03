import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const site = (context.site?.toString() ?? 'http://localhost:4321').replace(/\/$/, '')
  const projects = await getCollection('projects')

  const urls: { loc: string; lastmod: string; priority: number }[] = [
    {
      loc: `${site}/`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 1.0,
    },
    ...projects.map((p) => ({
      loc: `${site}/work/${p.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.8,
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}