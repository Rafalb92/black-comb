import type { Homepage, Media } from '@/payload-types'
import Image from 'next/image'

type Props = {
  data: Homepage['heroSection']
}

export function Hero({ data }: Props) {
  const { title, subtitle, backgroundImage, cta } = data
  const bg = typeof backgroundImage === 'object' ? (backgroundImage as Media) : null

  const ctaLabel = cta?.label || 'Zarezerwuj teraz'
  const ctaAnchor = cta?.anchor || 'book'

  return (
    <section id="hero" className="flex min-h-[calc(100svh-4.5rem)] flex-col lg:flex-row">
      {/* Left — image */}
      <div className="relative h-72 w-full shrink-0 sm:h-96 lg:h-auto lg:w-1/2 overflow-hidden">
        {bg?.url ? (
          <>
            <Image
              src={bg.url}
              alt={bg.alt || title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_30%] "
            />
            {/* Fade into content panel on large screens */}
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent hidden lg:block" />
          </>
        ) : (
          <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Brak zdjęcia</span>
          </div>
        )}
      </div>

      {/* Right — content */}
      <div className="flex flex-1 items-center justify-center bg-white px-8 py-16 lg:px-16 xl:px-24">
        <div className="max-w-lg w-full">
          {/* Decorative rule */}
          <div className="mb-8 h-px w-10 bg-zinc-300" />

          <h1 className="text-4xl font-extrabold tracking-tight text-[#131315] sm:text-5xl lg:text-6xl leading-[1.05]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-6 text-base text-zinc-500 leading-relaxed sm:text-lg">{subtitle}</p>
          )}

          <div className="mt-10">
            <a
              href={`#${ctaAnchor}`}
              className="inline-flex items-center rounded-full bg-[#131315] px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase text-white shadow-sm transition-all duration-300 hover:bg-zinc-700 hover:-translate-y-0.5 active:translate-y-0 active:bg-zinc-800"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
