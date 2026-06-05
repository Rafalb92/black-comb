'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import type { Homepage, Testimonial, Media } from '@/payload-types'

type Props = {
  sectionData: NonNullable<Homepage['testimonialsSection']>
  testimonials: Testimonial[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((p) => p.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Ocena ${value} na 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const pct = Math.max(0, Math.min(1, value - star + 1)) * 100
        return (
          <div key={star} className="relative size-4">
            <svg
              viewBox="0 0 20 20"
              className="absolute inset-0 size-full fill-zinc-700"
              aria-hidden
            >
              <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
              <svg
                viewBox="0 0 20 20"
                className="size-4 fill-amber-400"
                aria-hidden
                preserveAspectRatio="xMinYMid meet"
              >
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const GAP = 16 // px — matches gap-4

export function Testimonials({ sectionData, testimonials }: Props) {
  const { eyebrow, title, description } = sectionData
  const total = testimonials.length
  if (total === 0) return null

  // Three copies: [clones | real | clones] — enables seamless infinite loop
  const extended = [...testimonials, ...testimonials, ...testimonials]

  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  // rawIdx points into extended[]; real cards are at indices total..2*total-1
  const rawRef = useRef(total)
  const animatingRef = useRef(false)
  const perPageRef = useRef(1)

  const [displayIdx, setDisplayIdx] = useState(0) // 0..total-1 for dots/counter
  const [cardWidth, setCardWidth] = useState(0)

  const getStep = useCallback((): number => {
    const wrap = wrapRef.current
    if (!wrap) return 0
    const pp = perPageRef.current
    return (wrap.offsetWidth - GAP * (pp - 1)) / pp + GAP
  }, [])

  const applyTransform = useCallback(
    (rawIdx: number, animated: boolean) => {
      const track = trackRef.current
      if (!track) return
      const step = getStep()
      if (step === 0) return
      track.style.transition = animated
        ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
        : 'none'
      track.style.transform = `translateX(${-(rawIdx * step)}px)`
    },
    [getStep],
  )

  const updateLayout = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const w = wrap.offsetWidth
    let pp = 1
    if (w >= 1024) pp = 3
    else if (w >= 640) pp = 2
    perPageRef.current = pp
    setCardWidth((w - GAP * (pp - 1)) / pp)
    applyTransform(rawRef.current, false)
  }, [applyTransform])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(updateLayout)
    ro.observe(wrap)
    updateLayout()
    return () => ro.disconnect()
  }, [updateLayout])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (animatingRef.current) return
      animatingRef.current = true
      const next = rawRef.current + dir
      rawRef.current = next
      setDisplayIdx(((next % total) + total) % total)
      applyTransform(next, true)
    },
    [applyTransform, total],
  )

  const navigateTo = useCallback(
    (realI: number) => {
      if (animatingRef.current) return
      animatingRef.current = true
      const raw = rawRef.current
      // Pick the copy (prev / middle / next) closest to current position
      const closest = [realI, realI + total, realI + 2 * total].reduce((best, opt) =>
        Math.abs(opt - raw) < Math.abs(best - raw) ? opt : best,
      )
      rawRef.current = closest
      setDisplayIdx(realI)
      applyTransform(closest, true)
    },
    [applyTransform, total],
  )

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== 'transform') return
      animatingRef.current = false
      const raw = rawRef.current
      // Silently jump to the middle copy to keep infinite room in both directions
      if (raw >= 2 * total) {
        const jumped = raw - total
        rawRef.current = jumped
        applyTransform(jumped, false)
      } else if (raw < total) {
        const jumped = raw + total
        rawRef.current = jumped
        applyTransform(jumped, false)
      }
    },
    [applyTransform, total],
  )

  return (
    <section
      id="opinie"
      className="scroll-mt-20 bg-[#131315] px-8 py-16 lg:px-16 lg:py-24 xl:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <div className="mb-8 h-px w-10 bg-zinc-700" />
            {eyebrow && (
              <span className="mb-4 block text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                {eyebrow}
              </span>
            )}
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Arrows + counter */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              aria-label="Poprzednia opinia"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors duration-200 hover:border-zinc-500 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="w-10 text-center text-sm tabular-nums text-zinc-600">
              {displayIdx + 1}&thinsp;/&thinsp;{total}
            </span>
            <button
              onClick={() => navigate(1)}
              aria-label="Następna opinia"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-colors duration-200 hover:border-zinc-500 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={wrapRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: GAP, willChange: 'transform' }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((t, i) => {
              const avatar =
                typeof t.authorAvatar === 'object' && t.authorAvatar !== null
                  ? (t.authorAvatar as Media)
                  : null

              return (
                <article
                  key={`${t.id}-${i}`}
                  style={{ width: cardWidth > 0 ? cardWidth : undefined, flexShrink: 0 }}
                  className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 lg:p-8"
                >
                  <span
                    className="mb-2 font-serif text-6xl leading-none text-zinc-700 select-none"
                    aria-hidden="true"
                  >
                    &#8220;
                  </span>

                  <StarRating value={t.rating} />

                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {t.content}
                  </blockquote>

                  <footer className="mt-6 flex items-center gap-3 border-t border-zinc-800 pt-5">
                    {avatar?.url ? (
                      <Image
                        src={avatar.url}
                        alt={avatar.alt || t.authorName}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-zinc-500"
                      >
                        {getInitials(t.authorName)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">{t.authorName}</p>
                      {t.authorRole && (
                        <p className="truncate text-xs text-zinc-500">{t.authorRole}</p>
                      )}
                    </div>
                    {t.source && (
                      <span className="shrink-0 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-zinc-600">
                        {t.source}
                      </span>
                    )}
                  </footer>
                </article>
              )
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateTo(i)}
              aria-label={`Opinia ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === displayIdx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
