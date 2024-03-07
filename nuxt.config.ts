// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/google-fonts'],
  css: ['primeicons/primeicons.css'],
  imports: {
    dirs: ['./composables/useMarkdown'],
  },
  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Inter: [300, 500, 800],
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
});
