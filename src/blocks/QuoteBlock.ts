import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: {
    singular: { pl: 'Cytat', en: 'Quote' },
    plural: { pl: 'Cytaty', en: 'Quotes' },
  },
  fields: [
    {
      name: 'content',
      label: { pl: 'Treść cytatu', en: 'Quote content' },
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          label: { pl: 'Autor', en: 'Author' },
          type: 'text',
          required: true,
          admin: { width: '60%' },
        },
        {
          name: 'authorContext',
          label: { pl: 'Kontekst autora', en: 'Author context' },
          type: 'text',
          admin: {
            width: '40%',
            description: {
              pl: 'Opcjonalnie, np. „Klient od 2022".',
              en: 'Optional, e.g. "Client since 2022".',
            },
          },
        },
      ],
    },
  ],
}
