import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
  ],
  alias: { '~category': resolve('./') },
  components: [
    { path: '~category/components', prefix: 'Category' }
  ],
})
