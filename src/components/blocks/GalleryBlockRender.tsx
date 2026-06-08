import type { Realization, Media } from '@/payload-types'
import Image from 'next/image'

type GalleryBlock = Extract<NonNullable<Realization['content']>[number], { blockType: 'gallery' }>

type Props = {
  block: GalleryBlock
}

export function GalleryBlockRender({ block }: Props) {
  const images = block.images ?? []
  const layout = block.layout ?? 'grid'

  if (images.length === 0) return null

  const gridCols =
    layout === 'masonry' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <ul className={`grid gap-4 ${gridCols}`}>
      {images.map((item, i) => {
        const img =
          typeof item.image === 'object' && item.image !== null ? (item.image as Media) : null
        if (!img?.url) return null

        const aspectClass = layout === 'masonry' && i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-square'

        return (
          <li key={item.id ?? i} className={`relative overflow-hidden rounded-lg ${aspectClass}`}>
            <Image
              src={img.url}
              alt={img.alt || ''}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </li>
        )
      })}
    </ul>
  )
}
