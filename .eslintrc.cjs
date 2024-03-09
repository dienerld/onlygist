module.exports = {
  extends: [
    'dienerld/vue',
    '@nuxtjs/eslint-config-typescript'
  ],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['dienerld/node'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'no-undef': 'off'
      }
    }
  ],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'tailwindcss/no-custom-classname': ['warn', {
      cssFiles: [
        'node_modules/primeicons/primeicons.css'
      ]
    }]
  }
}
