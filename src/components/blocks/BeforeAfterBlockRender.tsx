import type { Realization, Media } from '@/payload-types'
import Image from 'next/image'

type BeforeAfterBlock = Extract<
  NonNullable<Realization['content']>[number],
  { blockType: 'beforeAfter' }
>

type Props = {
  block: BeforeAfterBlock
}

export function BeforeAfterBlockRender({ block }: Props) {
  const before =
    typeof block.before === 'object' && block.before !== null ? (block.before as Media) : null
  const after =
    typeof block.after === 'object' && block.after !== null ? (block.after as Media) : null

  if (!before?.url || !after?.url) return null

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#131315]">
            Przed
          </span>
          <Image
            src={before.url}
            alt={before.alt || 'Przed'}
            width={before.width ?? 800}
            height={before.height ?? 800}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#131315] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Po
          </span>
          <Image
            src={after.url}
            alt={after.alt || 'Po'}
            width={after.width ?? 800}
            height={after.height ?? 800}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="aspect-square w-full rounded-lg object-cover"
          />
        </div>
      </div>
      {block.caption ? (
        <p className="mt-4 text-center text-sm italic text-zinc-500">{block.caption}</p>
      ) : null}
    </div>
  )
}
