import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const SITE_URL = 'https://smartertraining.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date().toISOString().slice(0, 10)

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: buildDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
