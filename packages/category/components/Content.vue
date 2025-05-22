<template>
    <div
        class="relative sm:pr-14 xl:pr-32 flex flex-col items-center  justify-between w-full max-w-3xl mx-auto no-scrollbar">
        <div
            class="relative w-full after:absolute after:inset-0 after:w-full after:h-full after:to-black/70 after:from-transparent after:bg-gradient-to-t after:z-50">
            <div
                class=" absolute top-0 z-100 w-full sm:w-[calc(100%-3.5rem)] flex justify-between items-center py-2 pb-2 pr-4 pl-2 max-w-3xl mx-auto">
                <div class="flex items-center gap-4">
                    <a href="" @click.prevent="$router.back()">
                        <p class="sr-only">go back</p>
                        <SvgoBack class="flex-none rotate-180 text-3xl" />
                    </a>
                    <div>
                        <div class="flex items-center gap-[.2rem]">
                            <p class="font-bold text-[.95rem]">{{ shopData.name }}</p>
                            <SvgoVerify v-show="shopData?.business?.is_verified" class="text-xs" />
                        </div>
                        <NuxtLink to="/" class="text-[.725rem] cursor-pointer">مشاهده فروشگاه</NuxtLink>
                    </div>
                </div>
            </div>
            <NuxtImg placeholder loading="lazy"
                class="relative object-cover w-full z-20 min-h-[40vh] max-h-[50vh] after:absolute after:inset-0 after:w-full after:h-full after:from-black after:to-transparent after:bg-gradient-to-t after:z-50"
                :src="categoryData?.picture" alt="image of" />
        </div>

        <div class="w-full flex flex-col pt-4">
            <div class=" sm:order-none flex flex-col gap-2 xl:gap-4 justify-between w-full px-2 text-[1.06rem]">
                <div class="flex items-center sm:items-start md:items-center justify-between px-4">
                    <h1
                        class="w-full font-medium break-normal text-xl md:text-2xl line-clamp-2 max-w-[170px] md:max-w-[250px] xl:max-w-none flex">
                        {{ categoryData?.name }}
                    </h1>
                </div>
                <CategoryTagSwiper />
            </div>
            <CategoryProductList />
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useShopStore } from '~base/stores/shop'
import categoryService from '~category/lib/services';

const shop = useShopStore()
const { shopData } = storeToRefs(shop)

const props = defineProps(['modelValue', 'data'])
const emit = defineEmits(['update:modelValue'])

const route = useRoute()
const { data: categoryData } = useAsyncData("categoryData", async () =>
    categoryService.getSingleCategory(route.params?.categoryId), {
    transform: (data) => {
        return data?.data
    }
}
);
</script>
