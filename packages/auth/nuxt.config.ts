import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
  ],
  modules: [
    '@vee-validate/nuxt',
  ],
  alias: { '~auth': resolve('./') },
  components: [
    { path: '~auth/components', prefix: 'Auth' }
  ],
})
