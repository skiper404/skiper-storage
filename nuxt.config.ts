export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },

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

  runtimeConfig: {
    liqpayPublicKey: process.env.LIQPAY_PUBLIC_KEY as string,
    liqpayPrivateKey: process.env.LIQPAY_PRIVATE_KEY as string,

    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      appName: 'Skiper Storage'
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
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'ru',
        language: 'ru-RU',
        file: 'ru.json',
        name: 'Русский'
      },
      {
        code: 'pl',
        language: 'pl-Pl',
        file: 'pl.json',
        name: 'Polski'
      },
      {
        code: 'uk',
        language: 'uk-UK',
        file: 'uk.json',
        name: 'Українська'
      },
      {
        code: 'es',
        language: 'es-ES',
        file: 'es.json',
        name: 'Español'
      },
      {
        code: 'fr',
        language: 'fr-FR',
        file: 'fr.json',
        name: 'Français'
      }
    ]
  },

  shadcn: { componentDir: '@/components/ui', prefix: '' }
})
