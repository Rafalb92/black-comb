import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { pl: 'Plik', en: 'File' },
    plural: { pl: 'Media', en: 'Media' },
  },
  admin: {
    group: { pl: 'Administracja', en: 'Administration' },
    description: {
      pl: 'Wszystkie zdjęcia i pliki używane na stronie.',
      en: 'All images and files used on the website.',
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      label: { pl: 'Tekst alternatywny', en: 'Alt text' },
      type: 'text',
      required: true,
      admin: {
        description: {
          pl: 'Krótki opis zdjęcia. Ważne dla SEO i osób korzystających z czytników ekranu. Np. „Strzyżenie brody w Black Comb".',
          en: 'Short image description. Important for SEO and screen reader users.',
        },
      },
    },
    {
      name: 'caption',
      label: { pl: 'Podpis', en: 'Caption' },
      type: 'text',
      admin: {
        description: {
          pl: 'Opcjonalny podpis wyświetlany pod zdjęciem w niektórych miejscach.',
          en: 'Optional caption displayed under the image in some places.',
        },
      },
    },
  ],
}
