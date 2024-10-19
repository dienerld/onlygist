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
    public: {
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.SITE_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  // Libs
  supabase: {
    redirect: false,
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
