'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { SiteSetting } from '@/payload-types'
import { Footer } from '@/components/footer'

type Props = {
  initialData: SiteSetting
}

function isSiteSettings(value: unknown): value is SiteSetting {
  return typeof value === 'object' && value !== null && 'brandText' in value
}

export function FooterClient({ initialData }: Props) {
  const { data } = useLivePreview<SiteSetting>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  const safeData = isSiteSettings(data) ? data : initialData

  return <Footer settings={safeData} />
}
