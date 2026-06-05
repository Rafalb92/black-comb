import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: { pl: 'Opinia', en: 'Testimonial' },
    plural: { pl: 'Opinie', en: 'Testimonials' },
  },
  admin: {
    group: { pl: 'Treść', en: 'Content' },
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'rating', 'source', 'order', 'isActive'],
    description: {
      pl: 'Opinie klientów wyświetlane na stronie głównej.',
      en: 'Customer testimonials displayed on the homepage.',
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
    afterChange: [() => revalidatePath('/')],
    afterDelete: [() => revalidatePath('/')],
  },
  fields: [
    {
      name: 'content',
      label: { pl: 'Treść opinii', en: 'Content' },
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: {
          pl: 'Treść opinii. Max 500 znaków. Kopiuj z Google / Facebooka / maila.',
          en: 'Testimonial content. Max 500 characters.',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'authorName',
          label: { pl: 'Imię i nazwisko', en: 'Author Name' },
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: {
              pl: 'Np. „Jan Kowalski" lub „Anna K.". Inicjały też ok.',
              en: 'E.g. "John Doe" or "Anna K.".',
            },
          },
        },
        {
          name: 'authorRole',
          label: { pl: 'Opis autora', en: 'Author Role' },
          type: 'text',
          admin: {
            width: '50%',
            description: {
              pl: 'Opcjonalny. Np. „Stały klient", „Klient od 2021", „Wrocław".',
              en: 'Optional. E.g. "Regular customer", "Client since 2021".',
            },
          },
        },
      ],
    },
    {
      name: 'authorAvatar',
      label: { pl: 'Zdjęcie autora', en: 'Author Avatar' },
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: {
          pl: 'Opcjonalne. Jeśli puste, wyświetlą się inicjały z imienia i nazwiska.',
          en: 'Optional. Initials shown as fallback.',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          label: { pl: 'Ocena', en: 'Rating' },
          type: 'number',
          required: true,
          defaultValue: 5,
          min: 1,
          max: 5,
          admin: {
            width: '50%',
            step: 0.25,
            description: {
              pl: 'Od 1.00 do 5.00, krokiem 0.25. Np. 4.75, 5.00.',
              en: 'From 1.00 to 5.00 with 0.25 step.',
            },
          },
          validate: (value: number | null | undefined) => {
            if (value == null) return 'Ocena wymagana'
            if (value < 1 || value > 5) return 'Ocena musi być w zakresie 1-5'
            // Wymuszamy wielokrotność 0.25
            if (Math.round(value * 4) / 4 !== value) {
              return 'Ocena musi być wielokrotnością 0.25 (np. 4.50, 4.75, 5.00)'
            }
            return true
          },
        },
        {
          name: 'source',
          label: { pl: 'Źródło', en: 'Source' },
          type: 'select',
          required: true,
          defaultValue: 'google',
          options: [
            { label: { pl: 'Google', en: 'Google' }, value: 'google' },
            { label: { pl: 'Facebook', en: 'Facebook' }, value: 'facebook' },
            { label: { pl: 'Instagram', en: 'Instagram' }, value: 'instagram' },
            { label: { pl: 'Email', en: 'Email' }, value: 'email' },
            { label: { pl: 'Osobiście', en: 'In person' }, value: 'in-person' },
            { label: { pl: 'Inne', en: 'Other' }, value: 'other' },
          ],
          admin: {
            width: '50%',
            description: {
              pl: 'Skąd pochodzi opinia. Wyświetlane na karcie jako etykieta.',
              en: 'Where the testimonial comes from.',
            },
          },
        },
      ],
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
          pl: 'Niższa liczba = wyżej. Można też sortować przeciąganiem.',
          en: 'Lower number = higher.',
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
          pl: 'Odznacz, aby ukryć opinię bez usuwania jej.',
          en: 'Uncheck to hide without deleting.',
        },
      },
    },
  ],
}
