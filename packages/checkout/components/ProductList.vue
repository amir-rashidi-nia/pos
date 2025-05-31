<template>
    <div class="w-full relative h-full flex flex-col items-center pt-4">
        <div v-if="!products || products?.length <= 0 || !products[0]?.pk"
            class="w-full flex flex-col items-center justify-center py-4 rounded-lg gap-2 overflow-y-scroll no-scrollbar">
            <div
                class="rounded-full border border-text dark:border-dark-text w-14 h-14 flex items-center justify-center">
                <SvgoShopcart class="text-xl" />
            </div>
            <div class="text-sm select-none text-text-foreground dark:text-dark-text-foreground">سبد خرید شما خالی است.</div>
        </div>
        <div v-else
            class="w-full flex flex-col items-start p-2 rounded-lg gap-4 no-scrollbar">
            <template v-for="product in products" :key="product.pk">
                <CheckoutProductItem v-if="product.stock != 0 && product?.pk" :product-data="product" />
            </template>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '~base/stores/shopCart';

const shopCart = useCartStore()
const { products } = storeToRefs(shopCart)
</script>