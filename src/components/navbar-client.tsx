'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { SiteSetting } from '@/payload-types'
import { Navbar } from '@/components/navbar'

type Props = {
  initialData: SiteSetting
}

function isSiteSettings(value: unknown): value is SiteSetting {
  return typeof value === 'object' && value !== null && 'brandText' in value
}

export function NavbarClient({ initialData }: Props) {
  const { data } = useLivePreview<SiteSetting>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  const safeData = isSiteSettings(data) ? data : initialData

  return <Navbar settings={safeData} />
}
