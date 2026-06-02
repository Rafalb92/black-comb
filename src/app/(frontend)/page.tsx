import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="container mx-auto py-16 px-4">
      <h1 className="mb-8 text-4xl font-bold">Welcome to the Black Comb Barbershop!</h1>
      <p className="mb-4 text-lg">
        This is a demo homepage for the Black Comb Barbershop website. The content here is
        dynamically fetched from the Payload CMS backend.
      </p>
    </main>
  )
}
