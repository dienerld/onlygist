import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: [
    'node_modules',
    '.git',
    'dist',
    '.nuxt',
    'assets/',
    'supabase/**',
  ],
})
