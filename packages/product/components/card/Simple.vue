<template>
    <div :prefetch="false" :key="link" :external="external" class="relative w-full" >
        <div class="relative flex items-center overflow-hidden justify-center w-full rounded-lg border-[0.75px] bg-primary-foreground dark:bg-dark-primary-foreground border-primary-foreground dark:border-dark-primary-foreground"
            :class="[shopData.is_square ? 'aspect-square' : ' h-56 sm:h-96 md:h-72 lg:h-96']" >
                <video 
                    v-if="isVideo" 
                    ref="myVideo" 
                    :src="props.productData?.pictures_big_card[0]" 
                    :poster="shopData?.logo" 
                    class="absolute inset-0 object-cover w-full h-full pointer-events-none" 
                    autoplay loop muted playsinline>
                </video>
                <NuxtImg 
                    v-else
                    placeholder
                    loading="lazy" 
                    class="absolute inset-0 object-cover h-full w-full rounded-lg bg-primary-foreground dark:bg-dark-primary-foreground"
                    :src="props.productData?.picture" 
                    :alt="props.productData?.name"/>
                <ProductCardSticker v-if="!noTag" :productData="props.productData" :position="1.5"/>
        </div>
        <div class="flex justify-between pt-2 px-1">
            <div class="flex flex-col items-start justify-between">
                <p class="text-[.82rem] md:text-base break-normal line-clamp-2 max-w-[150px] leading-5">
                    {{ props.productData?.name }}
                </p>
                <p dir="ltr" v-if="!!props.productData?.discount_percent" class="text-xs md:text-sm font-normal">
                    {{ calcDiscount(props.productData?.price, props.productData?.discount_percent) }}
                </p>
                <p dir="ltr" v-else
                    class="text-xs md:text-sm font-normal text-text-foreground dark:text-dark-text-foreground pt-1">
                    {{ splitNumber(props.productData?.price) }}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop';

const props = defineProps({
    productData: {
        type: Object,
        required: true
    },
    saveable: {
        type: Boolean,
        default: false
    },
    noTag: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        required: false,
    },
    external: {
        type: Boolean,
        default: false,
    },
    link: {
        type: String,
        required: false,
    }
})

const shop = useShopStore()
const { shopData } = storeToRefs(shop);

const myVideo = ref(null)
const isVideo = computed(() => {
    if (props.productData?.is_big_card) {
        if (props.productData?.pictures_big_card[0]?.includes('.mp4')) {
            return true
        } else {
            return false
        }
    }
})
</script>