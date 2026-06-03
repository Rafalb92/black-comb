import type { Homepage } from '@/payload-types'

type Props = {
  data: NonNullable<Homepage['keywordsBanner']>
}

export function KeywordsBanner({ data }: Props) {
  const keywords = data.keywords ?? []
  if (keywords.length === 0) return null

  // Duplikacja słów dla seamless loop marquee
  const looped = [...keywords, ...keywords]

  return (
    <section
      aria-label="Słowa kluczowe"
      className="w-full overflow-hidden border-y border-zinc-200 bg-[#131315] py-6"
    >
      <div className="marquee flex whitespace-nowrap motion-reduce:animate-none">
        <ul className="marquee-track flex shrink-0 items-center gap-12 pr-12">
          {looped.map((kw, i) => (
            <li
              key={`${kw.id ?? kw.text}-${i}`}
              className="flex items-center gap-12 text-sm font-bold tracking-[0.25em] uppercase text-white"
            >
              <span>{kw.text}</span>
              <span className="text-zinc-600" aria-hidden>
                ／
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
