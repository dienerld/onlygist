/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app.vue',
    'modules/**/*.vue',
    'components/**/*.vue',
    'assets/presets/lara/**/*.{js,vue,ts}',
    'assets/presets/wind/**/*.{js,vue,ts}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-primeui')],
}
