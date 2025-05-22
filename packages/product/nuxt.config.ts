import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
    "@newarch/category",
  ],
  alias: { '~product': resolve('./') },
  components: [
    { path: '~product/components', prefix: 'Product' }
  ],
})
