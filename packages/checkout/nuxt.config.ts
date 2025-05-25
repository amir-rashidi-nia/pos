import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  app: {
    head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fontlibrary.org/face/b-nazanin',
        crossorigin: 'anonymous'
      }
    ]
  }
  },
  extends: [
    "@newarch/ui", 
    "@newarch/base",
    "@newarch/product",
    "@newarch/address",
  ],
  alias: { '~checkout': resolve('./') },
  components: [
    { path: '~checkout/components', prefix: 'Checkout' }
  ],
})
