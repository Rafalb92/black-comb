import type { CollectionConfig, FieldHook } from 'payload'
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

export const Realizations: CollectionConfig = {
  slug: 'realizations',
  labels: {
    singular: { pl: 'Realizacja', en: 'Realization' },
    plural: { pl: 'Realizacje', en: 'Realizations' },
  },
  admin: {
    group: { pl: 'Treść', en: 'Content' },
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'isFeatured', 'isActive'],
    description: {
      pl: 'Realizacje wyświetlane na stronie głównej i na podstronie /realizacje.',
      en: 'Realizations displayed on the homepage and /realizations subpage.',
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: '-publishedAt',
  hooks: {
    afterChange: [() => revalidatePath('/')],
    afterDelete: [() => revalidatePath('/')],
  },
  fields: [
    {
      name: 'title',
      label: { pl: 'Tytuł', en: 'Title' },
      type: 'text',
      required: true,
      admin: {
        description: {
          pl: 'Nazwa realizacji. Np. „Fade + klasyczna broda", „Modelowanie z trymowaniem".',
          en: 'Realization name.',
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
          pl: 'Generowany z tytułu. Używany w adresie /realizacje/[slug]. Po publikacji zmiana łamie istniejące linki.',
          en: 'Auto-generated from title. Used in /realizations/[slug] URL.',
        },
      },
    },
    {
      name: 'category',
      label: { pl: 'Kategoria', en: 'Category' },
      type: 'select',
      required: true,
      defaultValue: 'haircut',
      options: [
        { label: { pl: 'Strzyżenie', en: 'Haircut' }, value: 'haircut' },
        { label: { pl: 'Broda', en: 'Beard' }, value: 'beard' },
        { label: { pl: 'Strzyżenie + broda', en: 'Haircut + beard' }, value: 'combo' },
        { label: { pl: 'Stylizacja', en: 'Styling' }, value: 'styling' },
        { label: { pl: 'Inne', en: 'Other' }, value: 'other' },
      ],
      admin: {
        description: {
          pl: 'Kategoria pomaga grupować realizacje na liście.',
          en: 'Category for grouping.',
        },
      },
    },
    {
      name: 'shortDescription',
      label: { pl: 'Krótki opis', en: 'Short Description' },
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: {
          pl: 'Jedno-dwa zdania widoczne na karcie realizacji. Max 200 znaków.',
          en: 'One-two sentences on the card. Max 200 characters.',
        },
      },
    },
    {
      name: 'coverImage',
      label: { pl: 'Zdjęcie główne', en: 'Cover Image' },
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: {
          pl: 'Główne zdjęcie wyświetlane na karcie i u góry podstrony realizacji.',
          en: 'Main image for the card and realization page header.',
        },
      },
    },
    {
      name: 'gallery',
      label: { pl: 'Galeria zdjęć', en: 'Gallery' },
      type: 'array',
      maxRows: 12,
      labels: {
        singular: { pl: 'Zdjęcie', en: 'Image' },
        plural: { pl: 'Zdjęcia', en: 'Images' },
      },
      admin: {
        description: {
          pl: 'Dodatkowe zdjęcia (do 12). Wyświetlane na podstronie realizacji.',
          en: 'Additional images. Shown on the realization detail page.',
        },
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
      name: 'publishedAt',
      label: { pl: 'Data publikacji', en: 'Published at' },
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM yyyy',
        },
        description: {
          pl: 'Data wpływa na sortowanie. Najnowsze pokazują się pierwsze.',
          en: 'Date affects sorting. Newest first.',
        },
      },
    },
    {
      name: 'isFeatured',
      label: { pl: 'Wyróżniona', en: 'Featured' },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: {
          pl: 'Zaznacz aby pokazać badge „Polecane" na karcie.',
          en: 'Show "Featured" badge on the card.',
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
          pl: 'Odznacz aby ukryć realizację. Slug w bazie zostaje, w razie ponownej publikacji.',
          en: 'Uncheck to hide without losing slug.',
        },
      },
    },
  ],
}
