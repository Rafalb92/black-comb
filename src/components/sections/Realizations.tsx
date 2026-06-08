import type { Homepage, Realization, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'

type Props = {
  sectionData: NonNullable<Homepage['realizationsSection']>
  realizations: Realization[]
}

const categoryLabels: Record<string, string> = {
  haircut: 'Strzyżenie',
  beard: 'Broda',
  combo: 'Strzyżenie + broda',
  styling: 'Stylizacja',
  other: 'Inne',
}

export function Realizations({ sectionData, realizations }: Props) {
  const { eyebrow, title, description, ctaLabel } = sectionData
  const items = realizations.slice(0, 3)

  if (items.length === 0) return null

  return (
    <section id="realizacje" className="scroll-mt-20 bg-[#131315] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Nagłówek */}
        <div className="mb-10 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            {eyebrow ? (
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description ? <p className="mt-4 text-zinc-400">{description}</p> : null}
          </div>

          {ctaLabel ? (
            <Button size="sm" className="bg-background py-4 hover:bg-white rounded-full" asChild>
              <Link
                href="/realizacje"
                className="group hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-zinc-700 transition-colors
                 hover:text-black md:flex"
              >
                {ctaLabel}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Button>
          ) : null}
        </div>

        {/* Karty — horizontal scroll na mobile, 3 kolumny od sm */}
        <ul className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {items.map((r) => {
            const cover =
              typeof r.coverImage === 'object' && r.coverImage !== null
                ? (r.coverImage as Media)
                : null

            return (
              <li key={r.id} className="w-[72vw] shrink-0 snap-start sm:w-auto">
                <Link href={`/realizacje/${r.slug}`} className="group block h-full">
                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-zinc-800">
                    {/* Zdjęcie */}
                    {cover?.url ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt || r.title}
                        fill
                        sizes="(max-width: 640px) 72vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{
                          objectPosition:
                            cover.focalX != null && cover.focalY != null
                              ? `${cover.focalX}% ${cover.focalY}%`
                              : 'center top',
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-700" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Badge Polecane */}
                    {r.isFeatured ? (
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        Polecane
                      </span>
                    ) : null}

                    {/* Strzałka — pojawia się na hover */}
                    <div className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white text-[#131315] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 10L10 2M10 2H4M10 2V8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Tekst na dole */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        {categoryLabels[r.category] ?? r.category}
                      </p>
                      <h3 className="mt-1.5 text-base font-bold leading-snug text-white sm:text-lg">
                        {r.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA na mobile */}
        {ctaLabel ? (
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/realizacje"
              className="inline-block rounded-full border border-zinc-700 px-8 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-white hover:text-white"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
