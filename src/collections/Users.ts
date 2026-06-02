import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { pl: 'Użytkownik', en: 'User' },
    plural: { pl: 'Użytkownicy', en: 'Users' },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    group: { pl: 'Administracja', en: 'Administration' },
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: { pl: 'Imię', en: 'Name' },
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: { pl: 'Rola', en: 'Role' },
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: { pl: 'Administrator', en: 'Administrator' }, value: 'admin' },
        { label: { pl: 'Edytor', en: 'Editor' }, value: 'editor' },
      ],
      admin: {
        description: {
          pl: 'Administrator może zarządzać użytkownikami. Edytor może edytować treść.',
          en: 'Administrator can manage users. Editor can edit content.',
        },
      },
    },
  ],
}
