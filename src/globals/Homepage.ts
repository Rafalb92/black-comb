import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: { pl: 'Strona główna', en: 'Homepage' },
  admin: {
    group: { pl: 'Treść', en: 'Content' },
    description: {
      pl: 'Treść wyświetlana na stronie głównej. Każda sekcja jest osobno składalna.',
      en: 'Content shown on the homepage. Each section is collapsible.',
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'heroSection',
      label: { pl: 'Sekcja Hero', en: 'Hero Section' },
      type: 'group',
      admin: {
        description: {
          pl: 'Pierwsza sekcja widoczna po wejściu na stronę. Tytuł, podtytuł i zdjęcie w tle.',
          en: 'First section visible on page load. Title, subtitle and background image.',
        },
      },
      fields: [
        {
          name: 'title',
          label: { pl: 'Tytuł', en: 'Title' },
          type: 'text',
          required: true,
          admin: {
            description: {
              pl: 'Główny nagłówek H1. Np. „Klasyczny barbershop w sercu Wrocławia".',
              en: 'Main H1 heading.',
            },
          },
        },
        {
          name: 'subtitle',
          label: { pl: 'Podtytuł', en: 'Subtitle' },
          type: 'textarea',
          admin: {
            description: {
              pl: 'Opcjonalny tekst pod tytułem. 1-2 zdania o tym czym jesteście.',
              en: 'Optional subtitle. 1-2 sentences about you.',
            },
          },
        },
        {
          name: 'backgroundImage',
          label: { pl: 'Zdjęcie w tle', en: 'Background Image' },
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: {
              pl: 'Zdjęcie szerokokątne, minimum 1920×1080. Najlepiej ciemne lub z miejscem na tekst po lewej.',
              en: 'Wide image, minimum 1920×1080. Preferably dark or with empty space for text.',
            },
          },
        },
        {
          name: 'cta',
          label: { pl: 'Przycisk akcji', en: 'Call to Action' },
          type: 'group',
          admin: {
            description: {
              pl: 'Opcjonalny przycisk pod tekstem. Zostaw etykietę pustą żeby ukryć.',
              en: 'Optional button below text. Leave label empty to hide.',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  label: { pl: 'Tekst przycisku', en: 'Button Label' },
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: {
                      pl: 'Np. „Umów wizytę", „Zobacz usługi".',
                      en: 'E.g. "Book a visit", "See services".',
                    },
                  },
                },
                {
                  name: 'anchor',
                  label: { pl: 'Kotwica', en: 'Anchor' },
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: {
                      pl: 'Identyfikator sekcji bez #, np. „kontakt" lub „uslugi".',
                      en: 'Section anchor without #.',
                    },
                  },
                  validate: (value: string | null | undefined) => {
                    if (!value) return true // optional
                    if (!/^[a-z0-9-]+$/.test(value)) {
                      return 'Tylko małe litery, cyfry i myślniki.'
                    }
                    return true
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
