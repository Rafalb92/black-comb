import { getPayload } from 'payload'
import config from '@payload-config'
import { HomepageClient } from '@/components/homepage-client'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [homepage, services, testimonials, settings] = await Promise.all([
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
    payload.findGlobal({ slug: 'siteSettings', depth: 1 }),
  ])

  return (
    <HomepageClient
      initialData={homepage}
      initialServices={services.docs}
      initialTestimonials={testimonials.docs}
      initialSettings={settings}
    />
  )
}
