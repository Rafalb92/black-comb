import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: { pl: 'Ustawienia strony', en: 'Site Settings' },
  admin: {
    group: { pl: 'Konfiguracja', en: 'Configuration' },
    description: {
      pl: 'Globalne ustawienia strony — nawigacja, kontakt, stopka.',
      en: 'Global site settings — navigation, contact, footer.',
    },
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { pl: 'Nawigacja', en: 'Navigation' },
          description: {
            pl: 'Logo i menu wyświetlane w górnej części strony.',
            en: 'Logo and menu shown at the top of the page.',
          },
          fields: [
            {
              name: 'logo',
              label: { pl: 'Logo', en: 'Logo' },
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: {
                  pl: 'Opcjonalne. Jeśli puste, wyświetli się tekst „Black Comb".',
                  en: 'Optional. If empty, "Black Comb" text will be shown.',
                },
              },
            },
            {
              name: 'brandText',
              label: { pl: 'Tekst marki', en: 'Brand Text' },
              type: 'text',
              required: true,
              defaultValue: 'Black Comb',
              admin: {
                description: {
                  pl: 'Tekst wyświetlany gdy logo nie zostało wgrane. Używany też w SEO.',
                  en: 'Text shown when logo is not uploaded. Used in SEO as well.',
                },
              },
            },
            {
              name: 'navLinks',
              label: { pl: 'Linki nawigacji', en: 'Navigation Links' },
              type: 'array',
              minRows: 1,
              maxRows: 6,
              labels: {
                singular: { pl: 'Link', en: 'Link' },
                plural: { pl: 'Linki', en: 'Links' },
              },
              admin: {
                description: {
                  pl: 'Pozycje w menu (max 6). Każda kotwica musi pasować do identyfikatora sekcji na stronie, np. „uslugi" prowadzi do sekcji o id=uslugi.',
                  en: 'Menu items (max 6). Each anchor must match a section id on the page.',
                },
              },
              fields: [
                {
                  name: 'label',
                  label: { pl: 'Etykieta', en: 'Label' },
                  type: 'text',
                  required: true,
                  admin: {
                    description: {
                      pl: 'Tekst widoczny w menu, np. „Usługi".',
                      en: 'Visible menu text, e.g. "Services".',
                    },
                  },
                },
                {
                  name: 'anchor',
                  label: { pl: 'Kotwica', en: 'Anchor' },
                  type: 'text',
                  required: true,
                  admin: {
                    description: {
                      pl: 'Identyfikator sekcji bez znaku #, np. „uslugi". Dozwolone: małe litery, cyfry, myślniki.',
                      en: 'Section identifier without #, e.g. "services". Allowed: lowercase letters, numbers, hyphens.',
                    },
                  },
                  validate: (value: string | null | undefined) => {
                    if (!value) return 'Pole wymagane'
                    if (!/^[a-z0-9-]+$/.test(value)) {
                      return 'Tylko małe litery, cyfry i myślniki. Bez znaku # i spacji.'
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
