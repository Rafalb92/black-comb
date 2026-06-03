'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage } from '@/payload-types'
import { Hero } from '@/components/sections/Hero'

type Props = {
  initialData: Homepage
}

export function HomepageClient({ initialData }: Props) {
  const { data } = useLivePreview<Homepage>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  return (
    <main>
      <Hero data={data.heroSection} />
      {/* Kolejne sekcje będą dodawane tutaj */}
    </main>
  )
}
