import type { SiteSetting, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  settings: SiteSetting
}

export function Navbar({ settings }: Props) {
  const { logo, brandText, navLinks } = settings

  // Defensive: logo może być null, ID (jeśli depth=0) lub Media object
  const logoMedia = typeof logo === 'object' && logo !== null ? (logo as Media) : null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={brandText}>
          {logoMedia?.url ? (
            <Image
              src={logoMedia.url}
              alt={logoMedia.alt || brandText}
              width={logoMedia.width || 120}
              height={logoMedia.height || 40}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <span className="text-xl font-bold tracking-tight">{brandText}</span>
          )}
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks?.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.anchor}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu placeholder — your job with Claude Code */}
        <button className="md:hidden" aria-label="Menu">
          ☰
        </button>
      </nav>
    </header>
  )
}
