import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const projects = await getCollection('projects')

  return rss({
    title: 'Mission Portfolio — Project Log',
    description:
      'Catatan misi: proyek frontend, design engineering, dan sistem yang saya bangun.',
    site: context.site ?? 'http://localhost:4321',
    items: projects.map((p) => ({
      title: `${p.id.charAt(0).toUpperCase() + p.id.slice(1)} — ${p.data.role}`,
      description: p.data.summary,
      link: `/work/${p.id}`,
      pubDate: new Date(`${p.data.year}-01-01`),
      categories: p.data.stack,
    })),
    customData: `<language>id-ID</language>`,
  })
}