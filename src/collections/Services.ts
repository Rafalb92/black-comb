import type { CollectionConfig, FieldHook } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { revalidatePath } from 'next/cache'

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const formatSlug: FieldHook = ({ value, data, operation }) => {
  if (typeof value === 'string' && value.length > 0) {
    return slugify(value)
  }
  if (operation === 'create' && data?.title) {
    return slugify(data.title)
  }
  return value
}

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { pl: 'Usługa', en: 'Service' },
    plural: { pl: 'Usługi', en: 'Services' },
  },
  admin: {
    group: { pl: 'Treść', en: 'Content' },
    useAsTitle: 'title',
    defaultColumns: ['title', 'priceLabel', 'durationLabel', 'order', 'isActive'],
    description: {
      pl: 'Usługi wyświetlane w sekcji Usługi na stronie głównej.',
      en: 'Services displayed in the Services section on the homepage.',
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: { pl: 'Tytuł', en: 'Title' },
      type: 'text',
      required: true,
      admin: {
        description: {
          pl: 'Nazwa usługi. Np. „Strzyżenie męskie", „Modelowanie brody".',
          en: 'Service name.',
        },
      },
    },
    {
      name: 'slug',
      label: { pl: 'Identyfikator URL', en: 'Slug' },
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlug],
      },
      admin: {
        position: 'sidebar',
        description: {
          pl: 'Generowany automatycznie z tytułu. Możesz nadpisać. Małe litery, cyfry, myślniki.',
          en: 'Auto-generated from title. Editable. Lowercase, digits, hyphens.',
        },
      },
    },
    {
      name: 'shortDescription',
      label: { pl: 'Krótki opis', en: 'Short Description' },
      type: 'textarea',
      required: true,
      maxLength: 160,
      admin: {
        description: {
          pl: 'Jedno-dwa zdania na karcie usługi. Max 160 znaków.',
          en: 'One-two sentences on the service card. Max 160 characters.',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceLabel',
          label: { pl: 'Cena (etykieta)', en: 'Price Label' },
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: {
              pl: 'Tekst wyświetlany jako cena. Np. „80 zł", „od 80 zł", „80-120 zł", „Wycena indywidualna".',
              en: 'Price as text. E.g. "80 PLN", "from 80 PLN", "Custom quote".',
            },
          },
        },
        {
          name: 'durationLabel',
          label: { pl: 'Czas trwania (etykieta)', en: 'Duration Label' },
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: {
              pl: 'Tekst wyświetlany jako czas. Np. „30 min", „60-90 min", „około 1h".',
              en: 'Duration as text. E.g. "30 min", "60-90 min", "about 1h".',
            },
          },
        },
      ],
    },
    {
      name: 'image',
      label: { pl: 'Zdjęcie', en: 'Image' },
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          pl: 'Opcjonalne zdjęcie ilustrujące usługę.',
          en: 'Optional service image.',
        },
      },
    },
    {
      name: 'order',
      label: { pl: 'Kolejność', en: 'Order' },
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        step: 1,
        description: {
          pl: 'Niższa liczba = wyżej na liście. Można też sortować przeciąganiem.',
          en: 'Lower number = higher in list.',
        },
      },
    },
    {
      name: 'isPopular',
      label: { pl: 'Wyróżniona', en: 'Popular' },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: {
          pl: 'Zaznacz aby pokazać badge „Polecane" na karcie. Wyróżnij maksymalnie 2-3 usługi.',
          en: 'Show "Popular" badge on the card. Highlight max 2-3 services.',
        },
      },
    },
    {
      name: 'isActive',
      label: { pl: 'Aktywna', en: 'Active' },
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: {
          pl: 'Odznacz, aby ukryć usługę bez usuwania jej.',
          en: 'Uncheck to hide the service without deleting it.',
        },
      },
    },
  ],
}
