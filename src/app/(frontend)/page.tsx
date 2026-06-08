import { HomepageClient } from '@/components/homepage-client'
import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()

  // Wszystkie zapytania równolegle
  const [homepage, services, testimonials, realizations, settings] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', depth: 2 }),
    payload.find({
      collection: 'services',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'testimonials',
      where: { isActive: { equals: true } },
      sort: 'order',
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'realizations',
      where: { isActive: { equals: true } },
      sort: '-publishedAt',
      limit: 3,
      depth: 1,
    }),
    payload.findGlobal({ slug: 'siteSettings', depth: 1 }),
  ])

  return (
    <HomepageClient
      initialData={homepage}
      initialServices={services.docs}
      initialTestimonials={testimonials.docs}
      initialRealizations={realizations.docs}
      initialSettings={settings}
    />
  )
}
