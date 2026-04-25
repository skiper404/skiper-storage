export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxthub/core',
    '@nuxt/image',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    }
  ],

  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: { type: 'authjs' }
  },

  hub: {
    blob: {
      driver: 's3',
      accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
      bucket: process.env.R2_BUCKET_NAME as string,
      endpoint: process.env.R2_ENDPOINT as string,
      region: 'auto'
    }
  },

  dayjs: { defaultLocale: 'en' },

  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.json',
        name: '🇺🇸 English'
      },
      {
        code: 'ru',
        language: 'ru-RU',
        file: 'ru.json',
        name: '🇷🇺 Русский'
      },
      {
        code: 'pl',
        language: 'pl-Pl',
        file: 'pl.json',
        name: '🇵🇱 Polski'
      },
      {
        code: 'uk',
        language: 'uk-UK',
        file: 'uk.json',
        name: '🇺🇦 Українська'
      },
      {
        code: 'es',
        language: 'es-ES',
        file: 'es.json',
        name: '🇪🇸 Español'
      },
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.json',
        name: '🇫🇷 Français'
      }
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },

  shadcn: { componentDir: '@/components/ui', prefix: '' }
})
