<template>
  <div dir="rtl" class="sm:pb-0 relative w-full mx-auto z-10 font-iranYekan overflow-x-hidden scroll-smooth bg-background dark:bg-dark-background no-scrollbar text-text dark:text-dark-text">
    <NuxtPwaAssets />
    <div v-if="isLoading && ![ '/setting/shop/order', '/setting/shop/report', '/', '/profile', '/checkout'].includes(route.path) && route.name != 'feeds-id'" class="fixed m-auto inset-0 w-full z-100 bg-background dark:bg-dark-background">
      <NuxtImg class="h-24 w-24 rounded-lg absolute inset-0 m-auto" preload
        placeholder loading="lazy" :src="shopData?.logo || '/logo.png'" alt="logo" />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useShopStore } from '~base/stores/shop';
import { storeToRefs } from "pinia";
useHead({
  htmlAttrs: {
    lang: 'fa',
  },
  meta: [
    { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" }
  ]
});
useSchemaOrg([
  defineWebSite({
    name: "busibuy",
    description: "سرویس فروش ابری بیزی بای",
  }),
  defineOrganization({
    name: "busibuy",
    logo: '/img/logo.png',
    address: 'مشهد-دانشگاه فردوسی',
    sameAs: [
      'https://www.linkedin.com/company/cyrunex/',
      'https://www.instagram.com/cyrunexgrp/'
    ]
  }),
]);
useHead({
  bodyAttrs: {
    'data-theme': 'dark',
  },
});

const route = useRoute()
const { isLoading } = useLoadingIndicator({
    duration: 4000,
    throttle: 0,
})

const shop = useShopStore();
const { shopData } = storeToRefs(shop)
</script>
