import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    "@newarch/ui", 
    "@newarch/base",
    "@newarch/auth",
    "@newarch/order",
    "@newarch/product",
    "@newarch/shop",
    "@newarch/ui",
    "@newarch/checkout",
  ],
  pwa: {
    workbox: {
      cleanupOutdatedCaches: false,
    }
  },
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', "@nuxtjs/seo"],
  compatibilityDate: "2025-02-06",
  routeRules: {
    '/setting/**': { ssr: false },
    '/edit-product-id/**': { ssr: false },
  }
})