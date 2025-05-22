<template>
    <div class="flex flex-col gap-2 p-4 rounded-xl bg-primary-foreground dark:bg-dark-primary">
        <div class="flex flex-col items-start justify-between gap-2 w-full h-full">
            <div class="relative flex flex-col items-start justify-center gap-2 w-full">
                <div class="w-full flex">
                    <div class="w-full flex items-center gap-2">
                        <div
                            class="flex items-center justify-center h-[2.188rem] w-[2.188rem] rounded-full overflow-hidden border-[0.75px] border-primary-foreground dark:border-dark-primary">
                            <NuxtImg placeholder loading="lazy" class="object-cover rounded-full w-full h-full" :src="data?.logo" />
                        </div>
                        <div class="flex items-center gap-1">
                            <p class="max-w-[100px] line-clamp-1">{{ data?.shop_name }}</p>
                            <SvgoVerify v-show="shopData?.business?.is_verified" class="w-3.5 h-3.5 text-brand" />
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-start gap-1">
                        <p class="opacity-60 text-xs">شناسه پرداخت</p>
                        <div v-if="!data?.successful" class="flex items-center text-sm text-danger" @click="toast('در صورت کسر وجه، مبلغ طی ۴۸ ساعت آینده به حساب شما بازمیگردد', {
                            timeout: 6000
                        })">
                            <SvgoInfo class="ml-1"/>
                            پرداخت ناموفق
                        </div>
                        <p v-else>{{ data?.ref_id || '-' }}</p>
                    </div>
                </div>
                <div class="w-full flex">
                    <div class="w-full flex flex-col items-start gap-1">
                        <p class="opacity-60 text-xs">تاریخ</p>
                        <p>{{ data?.date }}</p>
                    </div>
                    <div class="w-full flex flex-col items-start gap-1">
                        <p class="opacity-60 text-xs">شناسه</p>
                        <p>{{ data?.tracking_code }}</p>
                    </div>
                </div>
                <div class="w-full flex flex-col items-start gap-1">
                    <p class="opacity-60 text-xs">وضعیت</p>
                    <div class="flex gap-2 items-center w-full justify-between">
                        <p class="max-w-[220px] line-clamp-1">{{ OrderStatus[data?.status] }}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <UiButton
                    @click="$emit('showModal')"
                    class="w-full">
                    محصولات
                </UiButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop';
import { OrderStatus } from '~order/lib/constants';
import { useToast } from 'vue-toastification';

const props = defineProps(['data'])
const shop = useShopStore()
const { shopData } = storeToRefs(shop)
const toast = useToast();
</script>
