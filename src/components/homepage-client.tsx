'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage } from '@/payload-types'
import { Hero } from '@/components/sections/Hero'

type Props = {
  initialData: Homepage
}

// Type guard: czy obiekt to faktycznie Homepage?
function isHomepage(value: unknown): value is Homepage {
  return typeof value === 'object' && value !== null && 'heroSection' in value
}

export function HomepageClient({ initialData }: Props) {
  const { data } = useLivePreview<Homepage>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Jeśli postMessage przyszedł z innego globala (np. siteSettings),
  // data nie ma kształtu Homepage — wracamy do initialData
  const safeData = isHomepage(data) ? data : initialData

  return (
    <main>
      <Hero data={safeData.heroSection} />
    </main>
  )
}
