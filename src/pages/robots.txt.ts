import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const site = (context.site?.toString() ?? 'http://localhost:4321').replace(/\/$/, '')
  const body = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}