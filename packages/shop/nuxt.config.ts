import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
  ],
  alias: { '~shop': resolve('./') },
  components: [
    { path: '~shop/components', prefix: 'Shop' }
  ],
})
