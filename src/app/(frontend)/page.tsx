import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'
import { Hero } from '@/components/sections/Hero'

import config from '@/payload.config'
import { HomepageClient } from '@/components/homepage-client'
import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  // const headers = await getHeaders()
  const payload = await getPayloadClient()
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })
  // const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main>
      <HomepageClient initialData={homepage} /> {/* Kolejne sekcje będą dodawane tutaj */}
    </main>
  )
}
