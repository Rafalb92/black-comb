import type { Realization } from '@/payload-types'
import { ParagraphBlockRender } from '@/components/blocks/ParagraphBlockRender'
import { GalleryBlockRender } from '@/components/blocks/GalleryBlockRender'
import { QuoteBlockRender } from '@/components/blocks/QuoteBlockRender'
import { BeforeAfterBlockRender } from '@/components/blocks/BeforeAfterBlockRender'

type Block = NonNullable<Realization['content']>[number]

type Props = {
  blocks: Block[]
}

export function BlockRenderer({ blocks }: Props) {
  return (
    <div className="space-y-12">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'paragraph':
            return <ParagraphBlockRender key={block.id} block={block} />
          case 'gallery':
            return <GalleryBlockRender key={block.id} block={block} />
          case 'quote':
            return <QuoteBlockRender key={block.id} block={block} />
          case 'beforeAfter':
            return <BeforeAfterBlockRender key={block.id} block={block} />
          default:
            return null
        }
      })}
    </div>
  )
}
