<template>
    <div v-for="_ in repeat" class="card">
        <div class="card__image" >
            <UiSkeletor class="rounded-lg w-full pb-[100%]" :class="{ 'h-60 sm:h-96 md:h-72 lg:h-96': !shopData.is_square }"/>
        </div>
        <div class="card__meta" :dir="[shopData.business?.is_english ? 'ltr' : 'rtl']">
            <h2>
                <UiSkeletor width="40%" height="10" class="my-1 rounded-lg" />
            </h2>
            <p>
                <UiSkeletor width="30%" height="10" class="rounded-lg" />
            </p>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop';
const repeat = ref('')
if(import.meta.client){
repeat.value = window.innerWidth < 768 ? 4 : 6             
}
const shop = useShopStore()
const { shopData } = storeToRefs(shop)
</script>