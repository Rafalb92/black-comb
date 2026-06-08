import type { Block } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'

export const ParagraphBlock: Block = {
  slug: 'paragraph',
  labels: {
    singular: { pl: 'Paragraf', en: 'Paragraph' },
    plural: { pl: 'Paragrafy', en: 'Paragraphs' },
  },
  fields: [
    {
      name: 'content',
      label: { pl: 'Treść', en: 'Content' },
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          LinkFeature({ enabledCollections: [] }),
        ],
      }),
    },
  ],
}
