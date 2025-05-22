<template>
        <UiDialog variant="mobile" :model-value="modelValue" @closed="closeHandler" close="none">
            <div class="relative flex flex-col items-center justify-between px-4">
                <div
                    class="sticky top-5 sm:pt-4 sm:top-0 z-20 w-full flex items-center justify-between gap-2 pt-1 pb-4 border-primary dark:border-dark-primary bg-background dark:bg-dark-primary-foreground">
                    <div class="flex items-center gap-2">
                        <div
                            class="flex items-center justify-center h-[2.5rem] w-[2.5rem] rounded-full overflow-hidden border-[0.75px] border-primary dark:border-dark-primary">
                            <NuxtImg preload placeholder loading="lazy" class="object-cover w-full h-full" :src="shopData.logo" />
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex items-center gap-1 text-sm font-semibold">
                                <h3>{{ shopData.name }}</h3>
                                <SvgoVerify
                                    v-show="shopData?.business?.is_verified" 
                                    name="Verify" 
                                    class="w-4 h-4 text-brand" />
                            </div>
                            <div v-if="!shopData?.is_preview" class="flex text-xs items-center gap-1 text-text-foreground dark:text-dark-text-foreground">
                                <p>{{ numberFormater(shopData?.product_count) }}</p>
                                محصول
                            </div>
                            <div v-else class="flex text-xs items-center gap-1 text-text-foreground dark:text-dark-text-foreground">
                                <p>{{ numberFormater(shopData?.business?.followers_count) }}</p>
                                دنبال کننده
                            </div>
                        </div>
                    </div>
                    <SvgoLink @click="copyLinkHandler" filled class="text-xl" />
                </div>
    
                <ul class="w-full flex flex-col gap-4 pb-6 justify-start items-start">
                    <li v-if="!!shopData.description" class="flex flex-col items-start gap-1 w-full">
                        <div class="flex items-center gap-1 w-full py-2 text-text-foreground dark:text-dark-text-foreground">
                            <h3 class="text-xs">درباره ما</h3>
                        </div>
                        <p class="text-justify whitespace-pre-line">
                            {{ shopData.description }}
                        </p>
                    </li>
                    <li v-if="!!shopData?.address" class="flex flex-col items-start gap-1 w-full">
                        <div class="flex items-center gap-1 w-full py-2 text-text-foreground dark:text-dark-text-foreground">
                            <h3 class="text-xs">آدرس</h3>
                        </div>
                        <p class="text-justify">
                            {{ `${shopData.address.address}` }}
                        </p>
                    </li>
                    <li v-if="!!shopData?.address" class="flex h-[30vh] self-center gap-1 w-full">
                        <BaseMapShow zoo :coordinate="[shopData?.address.lat, shopData?.address.lng]" />
                    </li>
                    <li v-if="!!shopData?.phone_number" class="flex flex-col items-start gap-1 w-full">
                        <div class="flex items-center gap-1 w-full py-2 text-text-foreground dark:text-dark-text-foreground">
                            <h3 class="text-xs">تماس</h3>
                        </div>
                        <p class="text-start">{{ shopData.phone_number }}</p>
                    </li>
                    <li class="flex flex-col items-center gap-2 w-full h-10">
                        <a referrerpolicy='origin' target='_blank'
                            href='https://trustseal.enamad.ir/?id=411385&Code=Y4CGlh4G25jgTNcxOzYd8rrDdwCkZYcE'><img
                                referrerpolicy='origin'
                                src='https://trustseal.enamad.ir/logo.aspx?id=411385&Code=Y4CGlh4G25jgTNcxOzYd8rrDdwCkZYcE'
                                alt='' style='cursor:pointer' Code='Y4CGlh4G25jgTNcxOzYd8rrDdwCkZYcE'>
                        </a>
                    </li>
                </ul>
            </div>
        </UiDialog>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useShopStore } from "~base/stores/shop";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const clientUrl = import.meta.env.VITE_CLIENT_URL;
const protocol = import.meta.env.VITE_PROTOCOL_URL;

const toast = useToast();
const router = useRouter();
const shop = useShopStore();
const { shopData } = storeToRefs(shop);

function copyLinkHandler() {
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(`${protocol}://${shopData.value.eng_name}.${clientUrl}`);
        toast(`لینک کپی شد`)
    } else {
        toast('لطفا از مرورگر به روز تری استفاده فرمایید')
    }
}

function closeHandler() {
    emit('update:modelValue', false)
    let currentPath = router.currentRoute.value.path;
    let queryParams = router.currentRoute.value.query;
    router.push({
        path: currentPath,
        query: { ...queryParams, info: undefined }
    });
}
</script>