import type { Block } from 'payload'

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: {
    singular: { pl: 'Przed/Po', en: 'Before/After' },
    plural: { pl: 'Przed/Po', en: 'Before/After' },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'before',
          label: { pl: 'Zdjęcie „przed"', en: 'Before image' },
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'after',
          label: { pl: 'Zdjęcie „po"', en: 'After image' },
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'caption',
      label: { pl: 'Opis pod zdjęciami', en: 'Caption' },
      type: 'text',
    },
  ],
}
