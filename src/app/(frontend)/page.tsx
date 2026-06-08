import { HomepageClient } from '@/components/homepage-client'
import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()

  // Najpierw homepage żeby znać displayLimit
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 2 })
  const realizationsLimit = homepage?.realizationsSection?.displayLimit ?? 4

  // Reszta równolegle
  const [services, testimonials, realizations, settings] = await Promise.all([
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
      limit: realizationsLimit,
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
