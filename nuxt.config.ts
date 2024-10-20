// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'node:path'
import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },

  // Nuxt
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@unlok-co/nuxt-stripe',
    '@vue-email/nuxt',
  ],

  imports: {
    dirs: [
      './composables/useMarkdown',
      './composables/useServices',
      './composables/useLogger',
    ],
  },

  pages: true,

  runtimeConfig: {
    resendKey: process.env.RESEND_API_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    public: {
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.SITE_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
    prices: {
      5: process.env.STRIPE_PRODUCT_ID_5BRL,
      10: process.env.STRIPE_PRODUCT_ID_10BRL,
      15: process.env.STRIPE_PRODUCT_ID_15BRL,
    },
  },

  // Libs
  supabase: {
    redirect: false,
  },
  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY,
    },
    server: {
      key: process.env.STRIPE_SECRET_KEY,
    },
  },
  ogImage: {
    fonts: ['Inter:400', 'Inter:500', 'Inter:700', 'Inter:800'],
  },

  site: {
    url: process.env.SITE_URL,
  },

  // Styles
  css: [
    'primeicons/primeicons.css',
    'assets/css/tailwind.css',
  ],

  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Inter: [300, 400, 500, 700, 800],
    },
  },

  primevue: {
    options: {
      unstyled: true,
    },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, './assets/presets/lara'),
    },
  },

  compatibilityDate: '2024-10-19',
})
