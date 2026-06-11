import type { Realization, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { BlockRenderer } from '@/components/block-renderer'

type Props = {
  realization: Realization
  prev: Pick<Realization, 'slug' | 'title' | 'category'> | null
  next: Pick<Realization, 'slug' | 'title' | 'category'> | null
}

const categoryLabels: Record<string, string> = {
  haircut: 'Strzyżenie',
  beard: 'Broda',
  combo: 'Strzyżenie + broda',
  styling: 'Stylizacja',
  other: 'Inne',
}

export function RealizationDetail({ realization, prev, next }: Props) {
  const { title, category, shortDescription, coverImage, publishedAt, content } = realization
  const cover = typeof coverImage === 'object' && coverImage !== null ? (coverImage as Media) : null
  const blocks = content ?? []

  const formattedDate = new Date(publishedAt).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article>
      {/* Hero */}
      <header className="relative h-[70vh] min-h-120 w-full overflow-hidden bg-zinc-900">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt || title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition:
                cover.focalX != null && cover.focalY != null
                  ? `${cover.focalX}% ${cover.focalY}%`
                  : 'center',
            }}
          />
        ) : null}

        {/* Scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" aria-hidden />

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 px-6 pt-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/realizacje"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M9 2L4 7L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Realizacje
            </Link>
          </div>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 flex h-full items-end px-6 pb-12 lg:px-10 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl text-white">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                {categoryLabels[category] ?? category}
              </span>
              <span className="text-xs text-white/40">·</span>
              <span className="text-xs text-white/60">{formattedDate}</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{shortDescription}</p>
          </div>
        </div>
      </header>

      {/* Treść */}
      {blocks.length > 0 ? (
        <div className="bg-white px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <BlockRenderer blocks={blocks} />
          </div>
        </div>
      ) : null}

      {/* Prev/Next */}
      {(prev || next) && (
        <nav
          aria-label="Nawigacja między realizacjami"
          className="bg-[#131315] px-6 py-12 lg:px-10 lg:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-zinc-600">
              Więcej realizacji
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/realizacje/${prev.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-zinc-800 p-6 transition-colors hover:border-zinc-600"
                >
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M7 2L3 6L7 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Poprzednia
                  </span>
                  {prev.category ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                      {categoryLabels[prev.category] ?? prev.category}
                    </span>
                  ) : null}
                  <span className="text-base font-bold text-zinc-300 transition-colors group-hover:text-white">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}

              {next ? (
                <Link
                  href={`/realizacje/${next.slug}`}
                  className="group flex flex-col items-end gap-2 rounded-xl border border-zinc-800 p-6 text-right transition-colors hover:border-zinc-600 sm:col-start-2"
                >
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400">
                    Następna
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M5 2L9 6L5 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {next.category ? (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                      {categoryLabels[next.category] ?? next.category}
                    </span>
                  ) : null}
                  <span className="text-base font-bold text-zinc-300 transition-colors group-hover:text-white">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </nav>
      )}
    </article>
  )
}
