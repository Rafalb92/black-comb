import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import '../globals.css'
import { NavbarClient } from '@/components/navbar-client'
import { Toaster } from 'sonner'
import { FooterClient } from '@/components/footer-client'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'),
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
    <html lang="pl" data-scroll-behavior="smooth" className={roboto.className}>
      <body>
        <NavbarClient initialData={settings} />
        {children}
        <FooterClient initialData={settings} />
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  )
}
