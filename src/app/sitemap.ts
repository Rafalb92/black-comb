import { getPayload } from 'payload'
import config from '@payload-config'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const realizations = await payload.find({
    collection: 'realizations',
    where: { isActive: { equals: true } },
    limit: 1000,
    depth: 0,
    sort: '-updatedAt',
  })

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/realizacje`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...realizations.docs.map((r) => ({
      url: `${base}/realizacje/${r.slug}`,
      lastModified: new Date(r.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
