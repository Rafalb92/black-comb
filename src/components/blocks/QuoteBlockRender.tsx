import type { Realization } from '@/payload-types'

type QuoteBlock = Extract<NonNullable<Realization['content']>[number], { blockType: 'quote' }>

type Props = {
  block: QuoteBlock
}

export function QuoteBlockRender({ block }: Props) {
  return (
    <blockquote className="border-l-4 border-[#131315] bg-zinc-50 px-8 py-6">
      <p className="text-xl font-medium italic text-zinc-700">„{block.content}"</p>
      <footer className="mt-4 text-sm text-zinc-500 not-italic">
        — <span className="font-bold text-[#131315]">{block.author}</span>
        {block.authorContext ? <span className="ml-2">· {block.authorContext}</span> : null}
      </footer>
    </blockquote>
  )
}
