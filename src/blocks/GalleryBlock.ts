import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: { pl: 'Galeria', en: 'Gallery' },
    plural: { pl: 'Galerie', en: 'Galleries' },
  },
  fields: [
    {
      name: 'images',
      label: { pl: 'Zdjęcia', en: 'Images' },
      type: 'array',
      minRows: 2,
      maxRows: 8,
      labels: {
        singular: { pl: 'Zdjęcie', en: 'Image' },
        plural: { pl: 'Zdjęcia', en: 'Images' },
      },
      fields: [
        {
          name: 'image',
          label: { pl: 'Zdjęcie', en: 'Image' },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      label: { pl: 'Układ', en: 'Layout' },
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: { pl: 'Siatka', en: 'Grid' }, value: 'grid' },
        { label: { pl: 'Karuzela', en: 'Carousel' }, value: 'carousel' },
        { label: { pl: 'Masonry', en: 'Masonry' }, value: 'masonry' },
      ],
      admin: {
        description: {
          pl: 'Jak wyświetlać zdjęcia. Siatka = równe kafelki, Karuzela = przewijane, Masonry = nierównej wysokości.',
          en: 'Image display layout.',
        },
      },
    },
  ],
}
