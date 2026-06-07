import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import '../globals.css'
import { NavbarClient } from '@/components/navbar-client'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Black Comb — Barbershop',
  description: 'Profesjonalny barbershop. Strzyżenie, broda, stylizacja.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({
    slug: 'siteSettings',
    depth: 2,
  })

  return (
    <html lang="pl">
      <body>
        <NavbarClient initialData={settings} />
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  )
}
