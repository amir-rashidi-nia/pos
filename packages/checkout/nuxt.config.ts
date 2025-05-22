import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
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
