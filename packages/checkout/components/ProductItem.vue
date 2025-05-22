<template>
    <div class="flex flex-col w-full justify-between items-center gap-2">
        <div class="flex justify-start items-start w-full gap-4">
            <div class="flex items-center justify-center overflow-hidden w-16 h-16 rounded-lg bg-[#F2F3F4]">
                <video v-if="isVideo(productData.cover)" class="max-h-[46vh] object-cover w-full h-full" :src="productData?.cover" autoplay loop muted></video>
                <NuxtImg placeholder loading="lazy" v-else class="object-cover h-full w-full" :src="productData.cover" /> 
            </div>
            <div class="">
                <h5 class="text-base line-clamp-1">{{ productData.name }}</h5>
                <div class="flex items-center gap-1 flex-wrap">
                    <p class="text-xs">{{ productData?.variant ? productData.variant : "" }}</p>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center w-full gap-4">
            <p>{{ splitNumber(productData.price) }}</p>
            <div class="flex items-center justify-center gap-2">
                <SvgoPlus name="Plus" @click.prevent="shopCart.increment(productData)"  class="cursor-pointer fill-brand h-8 w-8" />
                 <p class="select-none font-bold text-lg">{{ splitNumber(productData.quantity) }}</p>
                <SvgoMinus name="Minus" @click.prevent="shopCart.decrement(productData)" class="cursor-pointer fill-brand h-8 w-8" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '~base/stores/shopCart';

defineProps({
    productData: {
        type: Object,
        required: true
    }
});
const shopCart = useCartStore();
</script>
