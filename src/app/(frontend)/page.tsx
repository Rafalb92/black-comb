import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { Hero } from '@/components/sections/Hero'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main>
      <Hero data={homepage.heroSection} />
      {/* Kolejne sekcje będą dodawane tutaj */}
    </main>
  )
}
