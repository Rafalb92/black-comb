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
        {
          label: { pl: 'Kontakt', en: 'Contact' },
          fields: [
            {
              name: 'address',
              label: { pl: 'Adres', en: 'Address' },
              type: 'group',
              fields: [
                {
                  name: 'street',
                  label: { pl: 'Ulica i numer', en: 'Street' },
                  type: 'text',
                  required: true,
                  admin: {
                    description: {
                      pl: 'Np. „ul. Świdnicka 36/4"',
                      en: 'E.g. "Świdnicka 36/4"',
                    },
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'postalCode',
                      label: { pl: 'Kod pocztowy', en: 'Postal Code' },
                      type: 'text',
                      required: true,
                      admin: { width: '30%' },
                      validate: (value: string | null | undefined) => {
                        if (!value) return 'Kod pocztowy wymagany'
                        if (!/^\d{2}-\d{3}$/.test(value)) {
                          return 'Format: XX-XXX (np. 50-068)'
                        }
                        return true
                      },
                    },
                    {
                      name: 'city',
                      label: { pl: 'Miasto', en: 'City' },
                      type: 'text',
                      required: true,
                      admin: { width: '70%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'coordinates',
              label: { pl: 'Koordynaty mapy', en: 'Map Coordinates' },
              type: 'group',
              admin: {
                description: {
                  pl: 'Szerokość i długość geograficzna używana do pinpointu na mapie. Możesz wziąć z Google Maps — prawym na lokację, „Co tu jest", liczby na górze pokazują się jako lat, lng.',
                  en: 'Latitude and longitude for the map pin.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'lat',
                      label: { pl: 'Szerokość (lat)', en: 'Latitude' },
                      type: 'number',
                      required: true,
                      admin: { width: '50%', step: 0.0001 },
                    },
                    {
                      name: 'lng',
                      label: { pl: 'Długość (lng)', en: 'Longitude' },
                      type: 'number',
                      required: true,
                      admin: { width: '50%', step: 0.0001 },
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  label: { pl: 'Telefon', en: 'Phone' },
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: {
                      pl: 'Format dowolny, np. „+48 123 456 789" lub „123 456 789".',
                      en: 'Any format.',
                    },
                  },
                },
                {
                  name: 'email',
                  label: { pl: 'Email', en: 'Email' },
                  type: 'email',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'openingHours',
              label: { pl: 'Godziny otwarcia', en: 'Opening Hours' },
              type: 'array',
              required: true,
              minRows: 1,
              maxRows: 7,
              labels: {
                singular: { pl: 'Wiersz', en: 'Row' },
                plural: { pl: 'Wiersze', en: 'Rows' },
              },
              admin: {
                description: {
                  pl: 'Po jednym wierszu na dzień / grupę dni. Kolejność = kolejność wyświetlania.',
                  en: 'One row per day or group of days.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'days',
                      label: { pl: 'Dni', en: 'Days' },
                      type: 'text',
                      required: true,
                      admin: {
                        width: '40%',
                        description: {
                          pl: 'Np. „Pn-Pt", „Sobota", „Niedziela".',
                          en: 'E.g. "Mon-Fri", "Saturday".',
                        },
                      },
                    },
                    {
                      name: 'hours',
                      label: { pl: 'Godziny', en: 'Hours' },
                      type: 'text',
                      required: true,
                      admin: {
                        width: '60%',
                        description: {
                          pl: 'Np. „10:00 — 20:00" lub „Zamknięte".',
                          en: 'E.g. "10:00 — 20:00" or "Closed".',
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'social',
              label: { pl: 'Media społecznościowe', en: 'Social Media' },
              type: 'array',
              maxRows: 6,
              labels: {
                singular: { pl: 'Link', en: 'Link' },
                plural: { pl: 'Linki', en: 'Links' },
              },
              admin: {
                description: {
                  pl: 'Opcjonalne linki do mediów. Wyświetlane w sekcji Kontakt i w stopce.',
                  en: 'Optional social media links.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      label: { pl: 'Platforma', en: 'Platform' },
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'X / Twitter', value: 'x' },
                        { label: 'LinkedIn', value: 'linkedin' },
                      ],
                      admin: { width: '40%' },
                    },
                    {
                      name: 'url',
                      label: { pl: 'URL', en: 'URL' },
                      type: 'text',
                      required: true,
                      admin: {
                        width: '60%',
                        description: {
                          pl: 'Pełen URL z https://, np. „https://instagram.com/blackcomb"',
                          en: 'Full URL with https://',
                        },
                      },
                      validate: (value: string | null | undefined) => {
                        if (!value) return 'URL wymagany'
                        if (value.startsWith('/')) return true
                        try {
                          new URL(value)
                          return true
                        } catch {
                          return 'Niepoprawny URL (musi zaczynać się od https://)'
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { pl: 'Stopka', en: 'Footer' },
          fields: [
            {
              name: 'footerTagline',
              label: { pl: 'Krótki opis (tagline)', en: 'Tagline' },
              type: 'textarea',
              maxLength: 200,
              admin: {
                description: {
                  pl: 'Krótki tekst pod logo w stopce. 1-2 zdania. Np. „Barbershop z duszą. Klasyczne strzyżenie męskie we Wrocławiu.".',
                  en: 'Short text under the logo in the footer. 1-2 sentences.',
                },
              },
            },
            {
              name: 'copyrightText',
              label: { pl: 'Tekst copyright', en: 'Copyright text' },
              type: 'text',
              required: true,
              defaultValue: 'Black Comb. Wszelkie prawa zastrzeżone.',
              admin: {
                description: {
                  pl: 'Tekst wyświetlany w dolnym pasku stopki. Rok aktualny zostanie dodany automatycznie. Wpisz tylko nazwę i resztę, np. „Black Comb. Wszelkie prawa zastrzeżone.".',
                  en: 'Footer bottom bar text. Current year added automatically.',
                },
              },
            },
            {
              name: 'legalLinks',
              label: { pl: 'Linki prawne', en: 'Legal Links' },
              type: 'array',
              maxRows: 4,
              labels: {
                singular: { pl: 'Link', en: 'Link' },
                plural: { pl: 'Linki', en: 'Links' },
              },
              admin: {
                description: {
                  pl: 'Opcjonalne linki w dolnym pasku stopki — polityka prywatności, regulamin, RODO. Max 4.',
                  en: 'Optional links in footer bottom bar — privacy policy, terms, etc.',
                },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      label: { pl: 'Etykieta', en: 'Label' },
                      type: 'text',
                      required: true,
                      admin: {
                        width: '40%',
                        description: {
                          pl: 'Np. „Polityka prywatności", „Regulamin".',
                          en: 'E.g. "Privacy Policy", "Terms".',
                        },
                      },
                    },
                    {
                      name: 'url',
                      label: { pl: 'URL', en: 'URL' },
                      type: 'text',
                      required: true,
                      admin: {
                        width: '60%',
                        description: {
                          pl: 'Ścieżka wewnętrzna (np. „/polityka-prywatnosci") lub pełen URL (https://...).',
                          en: 'Internal path or full URL.',
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'showOpeningHoursInFooter',
              label: { pl: 'Pokaż godziny w stopce', en: 'Show opening hours' },
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: {
                  pl: 'Czy w stopce ma być widoczna sekcja z godzinami otwarcia. Same godziny edytujesz w zakładce „Kontakt".',
                  en: 'Whether to show opening hours in the footer.',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
