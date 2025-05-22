<template>
    <div
      class="w-full">
      <main v-if="data" class="flex w-full max-w-xl flex-col items-center justify-center gap-4">
        <h2 class="pt-4 text-xl font-bold">جزییات سفارش</h2>
        <div
          class="relative flex w-full flex-col items-start justify-center gap-2 rounded-lg bg-primary-foreground p-3 dark:bg-dark-primary-foreground">
          <p class="w-full text-center pb-2">{{ data?.data?.message }}</p>
          <div class="flex w-full">
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">جمع مبلغ پرداختی</p>
              <p class="">{{ data?.data?.amount }}</p>
            </div>
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">کد پیگیری سفارش</p>
              <p>{{ data?.data?.tracking_code }}</p>
            </div>
          </div>
          <div class="flex w-full">
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">شماره مرجع تراکنش</p>
              <p>{{ data?.data?.retrival_ref_id }}</p>
            </div>
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">شماره پیگیری تراکنش</p>
              <p>{{ data?.data?.ref_id}}</p>
            </div>
          </div>
          <div class="flex w-full">
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">تاریخ</p>
              <p class="line-clamp1 text-xs">{{ data?.data?.date }}</p>
            </div>
            <div class="flex w-full flex-col justify-start gap-1">
              <p class="text-xs opacity-60">تاریخ تغییر وضعیت</p>
              <p class="line-clamp1 text-xs">
                {{ data?.data?.date_status_changed }}
              </p>
            </div>
          </div>
        </div>
        <NuxtLink class="btn bg-brand w-full" :to="`${protocol}://${data?.data?.shop_name_eng}.${clientURL}?tab=2`" external>
          {{ `مشاهده سفارشات ${data?.data?.shop_name}` }}
        </NuxtLink>
      </main>
      <div v-else class="flex w-full max-w-xl flex-col items-center justify-center gap-4 pt-4" >
        <UiSkeletor class="w-full h-8 max-w-36 rounded-xl"/>
        <UiSkeletor class="w-full h-36 rounded-xl"/>
        <UiSkeletor class="w-full h-10 rounded-xl"/>
      </div>
    </div>
  </template>
  <script setup>
  import orderApi from "~checkout/lib/services";
  const clientURL = import.meta.env.VITE_CLIENT_URL;
  const protocol = import.meta.env.VITE_PROTOCOL_URL;
  const route = useRoute();
  const { data } = await useAsyncData('orderDetails',
    () => orderApi.getOrderdetails(route.query?.code), {
    server: false,
  });
  </script>
  