import type { SiteSetting, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from '@/components/extrenal-link'

type Props = {
  settings: SiteSetting
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-zinc-700 pl-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
      {children}
    </p>
  )
}

function isInternalLink(url: string | null | undefined): boolean {
  return typeof url === 'string' && url.startsWith('/')
}

export function Footer({ settings }: Props) {
  const {
    logo,
    brandText,
    navLinks,
    address,
    phone,
    email,
    openingHours,
    social,
    footerTagline,
    copyrightText,
    legalLinks,
    showOpeningHoursInFooter,
  } = settings

  const logoMedia = typeof logo === 'object' && logo !== null ? (logo as Media) : null
  const year = new Date().getFullYear()

  const links = (navLinks ?? []).filter(
    (link): link is NonNullable<typeof link> & { label: string; anchor: string } =>
      Boolean(link.label && link.anchor),
  )
  const socialLinks = (social ?? []).filter(
    (link): link is NonNullable<typeof link> & { platform: string; url: string } =>
      Boolean(link.platform && link.url),
  )
  const hours = (openingHours ?? []).filter(
    (row): row is NonNullable<typeof row> & { days: string; hours: string } =>
      Boolean(row.days && row.hours),
  )
  const legals = (legalLinks ?? []).filter(
    (link): link is NonNullable<typeof link> & { label: string; url: string } =>
      Boolean(link.label && link.url),
  )

  return (
    <footer className="bg-zinc-900 text-zinc-400">
      {/* Dekoracyjna linia na górze */}
      <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_auto] lg:gap-20">

          {/* Kolumna brandu */}
          <div className="space-y-6">
            <Link href="/" className="inline-block" aria-label={brandText}>
              {logoMedia?.url ? (
                <Image
                  src={logoMedia.url}
                  alt={logoMedia.alt || brandText}
                  width={logoMedia.width ?? 140}
                  height={logoMedia.height ?? 40}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-xl font-extrabold uppercase tracking-[0.2em] text-white">
                  {brandText}
                </span>
              )}
            </Link>

            {footerTagline ? (
              <p className="max-w-xs text-sm leading-relaxed text-zinc-400">{footerTagline}</p>
            ) : null}

            {socialLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <li key={link.id ?? link.url}>
                    <ExternalLink
                      href={link.url}
                      className="group flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-white"
                    >
                      <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">[</span>
                      {link.platform}
                      <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">]</span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Kolumna kontaktu */}
          <div className="min-w-45">
            <SectionLabel>Kontakt</SectionLabel>
            <address className="mt-5 space-y-2.5 text-sm not-italic">
              {address ? (
                <p className="leading-snug text-zinc-400">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </p>
              ) : null}
              {phone ? (
                <Link
                  href={`tel:${phone}`}
                  className="block text-zinc-400 transition-colors hover:text-white"
                >
                  {phone}
                </Link>
              ) : null}
              {email ? (
                <Link
                  href={`mailto:${email}`}
                  className="block text-zinc-400 transition-colors hover:text-white"
                >
                  {email}
                </Link>
              ) : null}
            </address>

            {showOpeningHoursInFooter && hours.length > 0 ? (
              <div className="mt-8">
                <SectionLabel>Godziny</SectionLabel>
                <ul className="mt-5 space-y-1.5 text-sm">
                  {hours.map((row, i) => (
                    <li key={row.id ?? i} className="flex justify-between gap-8">
                      <span className="text-zinc-400">{row.days}</span>
                      <span className="tabular-nums text-zinc-500">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Kolumna nawigacji */}
          {links.length > 0 ? (
            <div>
              <SectionLabel>Nawigacja</SectionLabel>
              <ul className="mt-5 space-y-2">
                {links.map((link) => (
                  <li key={link.id ?? link.anchor}>
                    <Link
                      href={`#${link.anchor}`}
                      className="group flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-white"
                    >
                      <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">[</span>
                      {link.label}
                      <span className="text-zinc-600 transition-colors group-hover:text-zinc-400">]</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Dolny pasek */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-zinc-800 pt-8 text-xs sm:flex-row sm:items-center">
          <p className="text-zinc-500">
            © {year} {copyrightText}
          </p>
          {legals.length > 0 ? (
            <ul className="flex flex-wrap gap-6">
              {legals.map((link) => (
                <li key={link.id ?? link.url}>
                  {isInternalLink(link.url) ? (
                    <Link href={link.url} className="text-zinc-500 transition-colors hover:text-zinc-200">
                      {link.label}
                    </Link>
                  ) : (
                    <ExternalLink href={link.url} className="text-zinc-500 transition-colors hover:text-zinc-200">
                      {link.label}
                    </ExternalLink>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
