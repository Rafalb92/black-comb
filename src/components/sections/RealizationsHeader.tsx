type Props = {
  title: string
  description?: string | null
}

export function RealizationsHeader({ title, description }: Props) {
  return (
    <header className="bg-[#131315] px-6 pb-0 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-7xl border-b border-zinc-800 pb-12 lg:pb-16">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
          Portfolio
        </span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </header>
  )
}
