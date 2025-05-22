<template>
    <header class="fixed xl:static top-0 w-full xl:max-w-5xl mx-auto flex-col z-50">
        <div class=" bg-background dark:bg-dark-background border-primary-foreground dark:border-dark-primary px-4 flex items-center border-b-[0.75px] xl:border-none">
            <!-- for mobile -->
            <div class="xl:hidden flex items-center justify-between w-full py-2">
                <div @click="showShopInfoHandler" class="flex items-center cursor-pointer xl:cursor-default">
                    <div class="flex items-center justify-center h-[2.188rem] w-[2.188rem] xl:w-36 xl:h-36 rounded-full overflow-hidden border-[0.75px] border-primary-foreground dark:border-dark-primary">
                        <img class="object-cover rounded-full w-full h-full" :src="shopData.logo || '/logo.png'" alt="logo"/>
                    </div>
                    <div class="pr-2">
                        <div class="flex items-center gap-1">
                            <h1 class="leading-4 text-[1.06rem] font-semibold">
                                {{shopData.name || 'بیزی بای' }}
                            </h1>
                            <SvgoVerify 
                                v-show="shopData?.business?.is_verified || name" 
                                class="text-xl text-brand" 
                                name="Verify" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- for mobile -->
            <!-- for descktop -->
            <div class="hidden xl:flex justify-between items-start gap-24 pt-10">
                <div
                    class="flex items-center justify-center w-36 h-36 rounded-full overflow-hidden border-[0.75px] border-primary-foreground dark:border-dark-primary">
                    <NuxtImg preload placeholder loading="lazy" class="object-cover w-full h-full" :src="shopData.logo" alt="logo"/>
                </div>
                <div class="flex flex-col items-start gap-6">
                    <div class="flex items-center gap-2 flex-1">
                        <div class="flex items-center justify-center pr-4 gap-1 flex-none">
                            <h1 class="text-[1.06rem] text-xl font-semibold flex-none line-clamp-1 max-w-40">
                                {{shopData.name || 'بیزی بای' }}
                            </h1>
                            <SvgoVerify
                                v-show="shopData?.business?.is_verified || props.name " 
                                class="w-4 h-4 text-brand" 
                                name="Verify" />
                        </div>
                        <UiButton @click="showCategoryModal = true" class="w-full">
                                <p class="text-center">
                                    دسته بندی ها 
                                </p>
                                <SvgoChevronDown filled class="mr-1 text-md pointer-events-none"/>
                        </UiButton>
                        <UiSearchbar />
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-1">
                            <div v-if="!!shopData?.website" class="flex items-center gap-1">
                                <SvgoLink filled />
                                <a :href="'//' + shopData.website" target="_blank">
                                {{ shopData.website}}
                                </a>
                            </div>
                            <span v-if="shopData?.phone_number && shopData?.business.website" class="px-1">-</span>
                            <div v-if="shopData?.phone_number" class="flex items-center gap-1">
                                <SvgoPhone filled />
                                <p class="text-start">
                                    {{ shopData.phone_number }}
                                </p>
                            </div>
                        </div>
                        <div v-if="shopData?.address?.address" class="flex items-center gap-1">
                            <SvgoLocation filled />
                            <p class="line-clamp-1 w-96">{{ shopData.address.address }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- for descktop -->
        </div>
    </header>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '~base/stores/shop';
import { useCartStore } from '~base/stores/shopCart';

const props = defineProps({
    name: {
        type: String,
    }
});

const route = useRoute();
const router = useRouter();
const shopCart = useCartStore();
const { count } = storeToRefs(shopCart);
const shop = useShopStore();
const { shopData, showCategoryModal } = storeToRefs(shop);
</script>