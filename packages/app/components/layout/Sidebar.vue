<template>
    <div class="z-50 w-14 xl:w-60 2xl:w-80 h-screen hidden fixed top-0 px-4 xl:pl-2 sm:flex flex-col pt-3 xl:pt-8 border-l-[0.75px] border-primary-foreground dark:border-dark-primary bg-background dark:bg-dark-background" >
        <!-- <OrderList /> -->
        <CheckoutShopCart/>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop';
import { useAuthBaseStore } from '~base/stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute()
const authBase = useAuthBaseStore()
const { user , isLogin } = storeToRefs(authBase)
const shop = useShopStore()
const { shopData } = storeToRefs(shop)
</script>