import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Realization } from '@/payload-types'

type ParagraphBlock = Extract<
  NonNullable<Realization['content']>[number],
  { blockType: 'paragraph' }
>

type Props = {
  block: ParagraphBlock
}

export function ParagraphBlockRender({ block }: Props) {
  return (
    <div className="prose prose-zinc max-w-none text-base leading-relaxed">
      <RichText data={block.content} />
    </div>
  )
}
