import type { Realization, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { BlockRenderer } from '@/components/block-renderer'

type Props = {
  realization: Realization
  prev: Pick<Realization, 'slug' | 'title'> | null
  next: Pick<Realization, 'slug' | 'title'> | null
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
      {/* Header z cover image */}
      <header className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-zinc-900">
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
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div className="relative z-10 flex h-full items-end px-6 pb-12 lg:px-10 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl text-white">
            <Link
              href="/realizacje"
              className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 hover:text-white"
            >
              ← Wszystkie realizacje
            </Link>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                {categoryLabels[category] ?? category}
              </span>
              <span className="text-xs text-white/50">·</span>
              <span className="text-xs text-white/70">{formattedDate}</span>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{shortDescription}</p>
          </div>
        </div>
      </header>

      {/* Treść z bloków */}
      {blocks.length > 0 ? (
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-0 lg:py-24">
          <BlockRenderer blocks={blocks} />
        </div>
      ) : null}

      {/* Prev/Next */}
      {(prev || next) && (
        <nav
          aria-label="Nawigacja między realizacjami"
          className="border-t border-zinc-200 bg-zinc-50 px-6 py-12 lg:px-10"
        >
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/realizacje/${prev.slug}`}
                className="group flex flex-col text-left transition-colors hover:text-[#131315]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  ← Poprzednia
                </span>
                <span className="mt-2 text-lg font-bold text-zinc-700 group-hover:text-[#131315]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/realizacje/${next.slug}`}
                className="group flex flex-col text-right transition-colors hover:text-[#131315]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Następna →
                </span>
                <span className="mt-2 text-lg font-bold text-zinc-700 group-hover:text-[#131315]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      )}
    </article>
  )
}
