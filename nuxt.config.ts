export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  vite: {
    server: {
      allowedHosts: true
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxthub/core',
    '@nuxt/image',
    'nuxt-auth-utils',
    'nuxt-authorization',
    'shadcn-nuxt',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-nodemailer'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    }
  ],

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

  runtimeConfig: {
    liqpayPublicKey: process.env.LIQPAY_PUBLIC_KEY as string,
    liqpayPrivateKey: process.env.LIQPAY_PRIVATE_KEY as string,

    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL
    }
  },

  nodemailer: {
    from: `Skiper Storage <no-reply@skiper.store>`,
    host: process.env.MAIL_HOST,
    port: 587, // 465 - Resend 587 - Brevo
    secure: false, // true - Resend 587 - Brevo
    auth: { user: process.env.MAIL_LOGIN, pass: process.env.MAIL_PASSWORD }
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
