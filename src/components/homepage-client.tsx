'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage, Service, Testimonial } from '@/payload-types'
import { Hero } from '@/components/sections/Hero'
import { KeywordsBanner } from '@/components/sections/KeywordsBanner'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'

type Props = {
  initialData: Homepage
  initialServices: Service[]
  initialTestimonials: Testimonial[]
}

function isHomepage(value: unknown): value is Homepage {
  return typeof value === 'object' && value !== null && 'heroSection' in value
}

export function HomepageClient({ initialData, initialServices, initialTestimonials }: Props) {
  const { data } = useLivePreview<Homepage>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  const safeData = isHomepage(data) ? data : initialData

  return (
    <main>
      <Hero data={safeData.heroSection} />
      {safeData.keywordsBanner?.isEnabled && <KeywordsBanner data={safeData.keywordsBanner} />}
      {safeData.aboutSection?.isEnabled && <About data={safeData.aboutSection} />}
      {safeData.servicesSection?.isEnabled && (
        <Services sectionData={safeData.servicesSection} services={initialServices} />
      )}
      {safeData.testimonialsSection?.isEnabled && (
        <Testimonials
          sectionData={safeData.testimonialsSection}
          testimonials={initialTestimonials}
        />
      )}
    </main>
  )
}
