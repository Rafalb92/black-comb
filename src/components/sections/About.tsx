import type { Homepage, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type Props = {
  data: NonNullable<Homepage['aboutSection']>
}

export function About({ data }: Props) {
  const { eyebrow, title, description, stats, image } = data
  const img = typeof image === 'object' && image !== null ? (image as Media) : null
  const statsList = stats ?? []

  return (
    <section id="o-nas" className="scroll-mt-20 bg-white px-8 py-16 lg:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* Left — content */}
        <div className="flex flex-col lg:flex-3">
          <div className="mb-8 h-px w-10 bg-zinc-300" />

          {eyebrow && (
            <span className="mb-4 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-zinc-500">
              {eyebrow}
            </span>
          )}

          <h2 className="text-4xl font-extrabold tracking-tight text-[#131315] leading-[1.05] sm:text-5xl">
            {title}
          </h2>

          <div className="prose prose-zinc mt-6 max-w-none text-zinc-500 [&_p]:leading-relaxed [&_p]:text-base sm:[&_p]:text-lg">
            <RichText data={description} />
          </div>

          {statsList.length > 0 && (
            <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-zinc-200 pt-10 sm:grid-cols-4">
              {statsList.map((stat) => (
                <li
                  key={stat.id ?? `${stat.value}-${stat.label}`}
                  className="flex flex-col gap-1"
                >
                  <span className="text-3xl font-extrabold tracking-tight text-[#131315]">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.12em] uppercase text-zinc-400">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right — image */}
        {img?.url ? (
          <div className="lg:flex-2">
            <div className="relative mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-3xl shadow-md lg:max-w-none">
              <Image
                src={img.url}
                alt={img.alt || title}
                fill
                sizes="(max-width: 1024px) 90vw, 38vw"
                className="object-cover"
                style={{
                  objectPosition:
                    img.focalX != null && img.focalY != null
                      ? `${img.focalX}% ${img.focalY}%`
                      : 'center',
                }}
              />
            </div>
          </div>
        ) : (
          <div className="lg:flex-2">
            <div className="mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-3xl bg-zinc-100 lg:max-w-none flex items-center justify-center">
              <span className="text-zinc-400 text-xs tracking-widest uppercase">Brak zdjęcia</span>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
