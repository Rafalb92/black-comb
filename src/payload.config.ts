import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { pl } from '@payloadcms/translations/languages/pl'
import { en } from '@payloadcms/translations/languages/en'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'
import { Services } from './collections/Services'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'Black Comb CMS',
      titleSuffix: '— Black Comb',
      description: 'Panel zarządzania treścią Black Comb Barbershop',
    },
    livePreview: {
      url: ({ globalConfig, collectionConfig, data }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

        // Globaly homepage i siteSettings → strona główna
        if (globalConfig?.slug === 'homepage') return base
        if (globalConfig?.slug === 'siteSettings') return base

        // Przyszłe kolekcje (przykład dla realizations później)
        // if (collectionConfig?.slug === 'realizations' && data?.slug) {
        //   return `${base}/realizacje/${data.slug}`
        // }

        return base
      },
      globals: ['homepage', 'siteSettings'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Services],
  globals: [SiteSettings, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  i18n: {
    supportedLanguages: { en, pl },
    fallbackLanguage: 'pl',
  },
  defaultDepth: 1,
  maxDepth: 5,
  sharp,
  plugins: [],
})
