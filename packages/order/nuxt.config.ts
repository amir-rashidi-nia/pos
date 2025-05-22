import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '~order': resolve('./') },
  components: [
    { path: '~order/components', prefix: 'Order' }
  ],
  extends: [
    "@newarch/ui", 
    "@newarch/base",
    "@newarch/product",
    "@newarch/address",
  ],
  devtools: { enabled: true },
})
