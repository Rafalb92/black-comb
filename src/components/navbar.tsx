'use client'

import type { SiteSetting, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarMobile } from '@/components/navbar-mobile'

type Props = {
  settings: SiteSetting
}

export function Navbar({ settings }: Props) {
  const { logo, brandText, navLinks } = settings
  const logoMedia = typeof logo === 'object' && logo !== null ? (logo as Media) : null
  const links = navLinks ?? []
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-zinc-950/[0.07]" />

      <nav className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo / Brand */}
        <Link href="/" className="group flex shrink-0 items-center" aria-label={brandText}>
          {logoMedia?.url ? (
            <Image
              src={logoMedia.url}
              alt={logoMedia.alt || brandText}
              width={logoMedia.width ?? 140}
              height={logoMedia.height ?? 40}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <span className="text-lg font-extrabold tracking-[0.2em] uppercase text-[#131315] transition-colors duration-300 group-hover:text-zinc-500">
              {brandText}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <li key={link.id ?? link.anchor}>
              <Link
                href={isHomepage ? `#${link.anchor}` : `/#${link.anchor}`}
                className="group flex items-center gap-1.5 px-3 py-2 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-zinc-400 transition-colors duration-300 hover:text-[#131315]"
              >
                <span className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-500">
                  [
                </span>

                {/* Sliding text — top to bottom on hover */}
                <span className="relative h-[1em] overflow-hidden leading-none inline-flex items-start">
                  <span className="block transition-transform duration-300 ease-in-out group-hover:translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute top-0 left-0 -translate-y-full block transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    {link.label}
                  </span>
                </span>

                <span className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-500">
                  ]
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        <NavbarMobile brandText={brandText} links={links} isHomepage={isHomepage} />
      </nav>
    </header>
  )
}
