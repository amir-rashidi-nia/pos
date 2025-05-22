import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: { '~base': resolve('./') },
  components: [
    { path: '~base/components', prefix: 'Base' }
  ],
  build: {
    transpile: ["vue-toastification"],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/leaflet',
    'nuxt-swiper',
  ]
})