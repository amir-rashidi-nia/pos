import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
  ],
  alias: { '~address': resolve('./') },
  components: [
    { path: '~address/components', prefix: 'Address' }
  ],
})
