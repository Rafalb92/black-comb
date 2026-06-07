import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
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
    {
      name: 'keywordsBanner',
      label: { pl: 'Baner ze słowami kluczowymi', en: 'Keywords Banner' },
      type: 'group',
      admin: {
        description: {
          pl: 'Pasek między sekcją Hero a O nas, ze słowami kluczowymi przewijającymi się w pętli.',
          en: 'Bar between Hero and About sections with looping keywords.',
        },
      },
      fields: [
        {
          name: 'isEnabled',
          label: { pl: 'Pokazuj baner', en: 'Show banner' },
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: {
              pl: 'Wyłącz, aby tymczasowo ukryć baner bez usuwania słów.',
              en: 'Disable to temporarily hide the banner without removing keywords.',
            },
          },
        },
        {
          name: 'keywords',
          label: { pl: 'Słowa kluczowe', en: 'Keywords' },
          type: 'array',
          minRows: 3,
          maxRows: 8,
          labels: {
            singular: { pl: 'Słowo', en: 'Keyword' },
            plural: { pl: 'Słowa', en: 'Keywords' },
          },
          admin: {
            description: {
              pl: 'Od 3 do 8 słów. Krótkie, jednowyrazowe lub maksymalnie dwa wyrazy. Np. „profesjonalizm", „klasyka", „precyzja".',
              en: '3 to 8 words. Keep them short, ideally one or two words each.',
            },
            condition: (_, siblingData) => siblingData?.isEnabled === true,
          },
          fields: [
            {
              name: 'text',
              label: { pl: 'Tekst', en: 'Text' },
              type: 'text',
              required: true,
              maxLength: 30,
            },
          ],
        },
      ],
    },
    {
      name: 'aboutSection',
      label: { pl: 'Sekcja O nas', en: 'About Section' },
      type: 'group',
      admin: {
        description: {
          pl: 'Sekcja przedstawiająca zakład. Możesz tymczasowo ukryć sekcję przełącznikiem na górze, dane pozostaną zachowane.',
          en: 'Section introducing the shop. You can temporarily hide the section with the toggle at the top, data remains saved.',
        },
      },
      fields: [
        {
          name: 'isEnabled',
          label: { pl: 'Pokazuj sekcję', en: 'Show section' },
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: {
              pl: 'Wyłącz, aby tymczasowo ukryć sekcję na stronie.',
              en: 'Disable to temporarily hide the section on the page.',
            },
          },
        },
        {
          name: 'eyebrow',
          label: { pl: 'Etykieta nad tytułem', en: 'Eyebrow' },
          type: 'text',
          admin: {
            description: {
              pl: 'Opcjonalna mała etykieta nad tytułem, np. „Kim jesteśmy".',
              en: 'Optional small label above the title.',
            },
          },
        },
        {
          name: 'title',
          label: { pl: 'Tytuł', en: 'Title' },
          type: 'text',
          required: true,
          admin: {
            description: {
              pl: 'Główny tytuł sekcji. Np. „Black Comb — barbershop z duszą".',
              en: 'Main section title.',
            },
          },
        },
        {
          name: 'description',
          label: { pl: 'Opis', en: 'Description' },
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: () => [ParagraphFeature(), BoldFeature(), ItalicFeature()],
          }),
          admin: {
            description: {
              pl: 'Dwa-trzy akapity o zakładzie. Możesz pogrubić ważne słowa.',
              en: 'Two-three paragraphs about the shop. You can bold key words.',
            },
          },
        },
        {
          name: 'stats',
          label: { pl: 'Statystyki', en: 'Stats' },
          type: 'array',
          minRows: 0,
          maxRows: 4,
          labels: {
            singular: { pl: 'Statystyka', en: 'Stat' },
            plural: { pl: 'Statystyki', en: 'Stats' },
          },
          admin: {
            description: {
              pl: 'Opcjonalna lista liczb / faktów. Maksymalnie 4. Zostaw pustą jeśli nie chcesz pokazywać.',
              en: 'Optional list of numbers / facts. Up to 4. Leave empty to hide.',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  label: { pl: 'Wartość', en: 'Value' },
                  type: 'text',
                  required: true,
                  admin: {
                    width: '40%',
                    description: {
                      pl: 'Liczba lub krótkie hasło. Np. „7 lat", „1200+", „5".',
                      en: 'Number or short value. E.g. "7 years", "1200+", "5".',
                    },
                  },
                },
                {
                  name: 'label',
                  label: { pl: 'Etykieta', en: 'Label' },
                  type: 'text',
                  required: true,
                  admin: {
                    width: '60%',
                    description: {
                      pl: 'Co opisuje wartość. Np. „doświadczenia", „zadowolonych klientów", „fryzjerów".',
                      en: 'What the value describes.',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'image',
          label: { pl: 'Zdjęcie', en: 'Image' },
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: {
              pl: 'Zdjęcie wnętrza lub szczegółu z zakładu. Wyświetli się obok tekstu.',
              en: 'Photo of the interior. Displayed next to the text.',
            },
          },
        },
      ],
    },
    {
      name: 'servicesSection',
      label: { pl: 'Sekcja Usługi', en: 'Services Section' },
      type: 'group',
      admin: {
        description: {
          pl: 'Nagłówek sekcji Usługi. Same usługi dodajesz w kolekcji "Usługi".',
          en: 'Services section heading. Service items are managed in the Services collection.',
        },
      },
      fields: [
        {
          name: 'isEnabled',
          label: { pl: 'Pokazuj sekcję', en: 'Show section' },
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          label: { pl: 'Etykieta nad tytułem', en: 'Eyebrow' },
          type: 'text',
        },
        {
          name: 'title',
          label: { pl: 'Tytuł', en: 'Title' },
          type: 'text',
          required: true,
          defaultValue: 'Usługi',
        },
        {
          name: 'description',
          label: { pl: 'Opis', en: 'Description' },
          type: 'textarea',
          admin: {
            description: {
              pl: 'Krótki opis pod tytułem. Opcjonalnie.',
              en: 'Short description under title. Optional.',
            },
          },
        },
      ],
    },
    {
      name: 'testimonialsSection',
      label: { pl: 'Sekcja Opinie', en: 'Testimonials Section' },
      type: 'group',
      admin: {
        description: {
          pl: 'Nagłówek sekcji Opinie. Same opinie dodajesz w kolekcji "Opinie".',
          en: 'Testimonials section heading. Items managed in Testimonials collection.',
        },
      },
      fields: [
        {
          name: 'isEnabled',
          label: { pl: 'Pokazuj sekcję', en: 'Show section' },
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          label: { pl: 'Etykieta nad tytułem', en: 'Eyebrow' },
          type: 'text',
        },
        {
          name: 'title',
          label: { pl: 'Tytuł', en: 'Title' },
          type: 'text',
          required: true,
          defaultValue: 'Opinie klientów',
        },
        {
          name: 'description',
          label: { pl: 'Opis', en: 'Description' },
          type: 'textarea',
        },
      ],
    },
    {
      name: 'contactSection',
      label: { pl: 'Sekcja Kontakt', en: 'Contact Section' },
      type: 'group',
      admin: {
        description: {
          pl: 'Sekcja z formularzem kontaktowym i mapą. Dane kontaktowe edytujesz w Ustawieniach strony → Kontakt.',
          en: 'Section with contact form and map. Contact data is managed in Site Settings → Contact.',
        },
      },
      fields: [
        {
          name: 'isEnabled',
          label: { pl: 'Pokazuj sekcję', en: 'Show section' },
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          label: { pl: 'Etykieta nad tytułem', en: 'Eyebrow' },
          type: 'text',
        },
        {
          name: 'title',
          label: { pl: 'Tytuł', en: 'Title' },
          type: 'text',
          required: true,
          defaultValue: 'Kontakt',
        },
        {
          name: 'description',
          label: { pl: 'Opis pod tytułem', en: 'Description' },
          type: 'textarea',
        },
        {
          name: 'formCtaLabel',
          label: { pl: 'Tekst przycisku formularza', en: 'Form button label' },
          type: 'text',
          required: true,
          defaultValue: 'Wyślij wiadomość',
        },
        {
          name: 'mapZoom',
          label: { pl: 'Zoom mapy', en: 'Map zoom' },
          type: 'number',
          defaultValue: 15,
          min: 10,
          max: 19,
          admin: {
            step: 1,
            description: {
              pl: 'Od 10 (dalej) do 19 (bliżej). 15 to dobry default dla widoku ulicy.',
              en: 'From 10 (further) to 19 (closer). 15 is good for street view.',
            },
          },
        },
      ],
    },
  ],
}
