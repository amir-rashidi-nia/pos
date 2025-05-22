<template>
    <div class="flex items-center gap-2 px-4 border-b-[0.75px] py-2 mb-4 sm:min-h-[57px] border-primary-foreground dark:border-dark-primary">
        <div @click.prevent="$router.push(`/`)" class="sm:hidden flex items-center cursor-pointer xl:cursor-default">
            <div class="flex items-center justify-center h-[2.188rem] w-[2.188rem] xl:w-36 xl:h-36 rounded-full overflow-hidden border-[0.75px] border-primary-foreground dark:border-dark-primary">
                <NuxtImg preload placeholder loading="lazy" class="object-cover w-full h-full" :src="shopData.logo" />
            </div>
            <div class="pr-2 xl:hidden">
                <div class="flex items-center gap-1">
                    <h1 class="leading-4 text-[1.06rem] font-semibold">{{shopData.name }}</h1>
                    <SvgoVerify v-show="shopData?.business?.is_verified" class="text-xl text-brand" name="Verify" />
                </div>
            </div>
        </div>
        <h1 class="hidden sm:block leading-4 text-[1.06rem] font-semibold">{{ route.meta.pageName }}</h1>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useShopStore } from '~base/stores/shop';

const route = useRoute()
const shop = useShopStore()
const {  shopData } = storeToRefs(shop)
</script>