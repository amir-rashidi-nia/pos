import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['nuxt-svgo'],
  css: [
    '~ui/assets/css/main.css',
    'vue-final-modal/style.css'
  ],
  alias: { '~ui': resolve('./') },
  components: [
    { path: '~ui/components', prefix: 'Ui' }
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  postcss: {
    plugins: {
      autoprefixer: require('@tailwindcss/postcss')
    }
   }
})