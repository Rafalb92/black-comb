'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Realization, Media } from '@/payload-types'
import type { RealizationsListResult } from '@/lib/realizations'

const categoryLabels: Record<string, string> = {
  haircut: 'Strzyżenie',
  beard: 'Broda',
  combo: 'Strzyżenie + broda',
  styling: 'Stylizacja',
  other: 'Inne',
}

const allCategories = ['haircut', 'beard', 'combo', 'styling', 'other'] as const

type Props = {
  initialList: RealizationsListResult
  counts: Record<string, number>
  activeCategory?: string
}

function buildFilterHref(category?: string): string {
  if (!category) return '/realizacje'
  return `/realizacje?kategoria=${category}`
}

export function RealizationsList({ initialList, counts, activeCategory }: Props) {
  const [docs, setDocs] = useState<Realization[]>(initialList.docs)
  const [currentPage, setCurrentPage] = useState(initialList.currentPage)
  const [hasNextPage, setHasNextPage] = useState(initialList.hasNextPage)
  const [totalDocs, setTotalDocs] = useState(initialList.totalDocs)
  const [isPending, startTransition] = useTransition()

  const totalActive = Object.values(counts).reduce((sum, n) => sum + n, 0)

  const loadMore = () => {
    startTransition(async () => {
      const nextPage = currentPage + 1
      const searchParams = new URLSearchParams({
        page: String(nextPage),
        limit: '6',
        depth: '1',
        sort: '-publishedAt',
      })

      const where: Record<string, unknown> = {
        isActive: { equals: true },
      }
      if (activeCategory) {
        where.category = { equals: activeCategory }
      }
      searchParams.set('where', JSON.stringify(where))

      try {
        const res = await fetch(`/api/realizations?${searchParams.toString()}`)
        if (!res.ok) throw new Error('Failed to load more')
        const data = await res.json()
        setDocs((prev) => [...prev, ...data.docs])
        setCurrentPage(nextPage)
        setHasNextPage(data.hasNextPage ?? false)
        setTotalDocs(data.totalDocs ?? totalDocs)
      } catch (error) {
        console.error('Load more failed:', error)
      }
    })
  }

  return (
    <section className="bg-[#131315] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Filtry */}
        <nav aria-label="Filtruj realizacje" className="mb-12">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={buildFilterHref()}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  !activeCategory
                    ? 'bg-white text-[#131315]'
                    : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                }`}
              >
                Wszystkie
                <span className="opacity-50">({totalActive})</span>
              </Link>
            </li>
            {allCategories
              .filter((cat) => (counts[cat] ?? 0) > 0)
              .map((cat) => (
                <li key={cat}>
                  <Link
                    href={buildFilterHref(cat)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                      activeCategory === cat
                        ? 'bg-white text-[#131315]'
                        : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                    }`}
                  >
                    {categoryLabels[cat]}
                    <span className="opacity-50">({counts[cat]})</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {docs.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 p-16 text-center">
            <p className="text-zinc-500">
              {activeCategory
                ? 'Brak realizacji w tej kategorii.'
                : 'Brak realizacji do wyświetlenia.'}
            </p>
          </div>
        ) : (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((r) => {
                const cover =
                  typeof r.coverImage === 'object' && r.coverImage !== null
                    ? (r.coverImage as Media)
                    : null

                return (
                  <li key={r.id}>
                    <Link href={`/realizacje/${r.slug}`} className="group block">
                      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-zinc-800">
                        {cover?.url ? (
                          <Image
                            src={cover.url}
                            alt={cover.alt || r.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                        {r.isFeatured ? (
                          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                            Polecane
                          </span>
                        ) : null}

                        {/* Hover arrow */}
                        <div className="absolute right-4 top-4 flex size-8 scale-75 items-center justify-center rounded-full bg-white text-[#131315] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
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

                        {/* Text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                            {categoryLabels[r.category] ?? r.category}
                          </p>
                          <h2 className="mt-1.5 text-base font-bold leading-snug text-white sm:text-lg">
                            {r.title}
                          </h2>
                          {r.shortDescription ? (
                            <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                              {r.shortDescription}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Pokaż więcej */}
            {hasNextPage ? (
              <div className="mt-12 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={isPending}
                  className="inline-flex items-center rounded-full border border-zinc-700 px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-300 transition-all duration-300 hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? 'Ładowanie…' : 'Pokaż więcej'}
                </button>
                <p className="text-xs text-zinc-600">
                  {docs.length} z {totalDocs}
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
