import type { Homepage, Realization, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

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

  if (realizations.length === 0) return null

  return (
    <section id="realizacje" className="scroll-mt-20 bg-white px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            {eyebrow ? (
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#131315] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description ? <p className="mt-4 text-zinc-500">{description}</p> : null}
          </div>

          {ctaLabel ? (
            <Link
              href="/realizacje"
              className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.15em] text-[#131315] underline-offset-4 hover:underline md:inline-block"
            >
              {ctaLabel} →
            </Link>
          ) : null}
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {realizations.map((r) => {
            const cover =
              typeof r.coverImage === 'object' && r.coverImage !== null
                ? (r.coverImage as Media)
                : null

            return (
              <li key={r.id}>
                <Link href={`/realizacje/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-zinc-100">
                    {cover?.url ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt || r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{
                          objectPosition:
                            cover.focalX != null && cover.focalY != null
                              ? `${cover.focalX}% ${cover.focalY}%`
                              : 'center',
                        }}
                      />
                    ) : null}

                    {r.isFeatured ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#131315]">
                        Polecane
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {categoryLabels[r.category] ?? r.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-[#131315] transition-colors group-hover:text-zinc-600">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{r.shortDescription}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {ctaLabel ? (
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/realizacje"
              className="inline-block rounded-full bg-[#131315] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-zinc-700"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
