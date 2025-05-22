<template>
    <div class="w-full space-y-4">
        <div class="w-full flex flex-col gap-2">
            <p class="text-xs items-center ">
                انتخاب آدرس
            </p>
            <ul v-if="addresses?.length > 0" class="flex gap-2 overflow-x-auto no-scrollbar snap-mandatory">
                <swiper-container ref="containerRef" :mousewheel="true" :simulate-touch="true" :init="false" class="flex gap-2 overflow-x-auto no-scrollbar">
                    <swiper-slide v-for="address in addresses" :key="address?.pk" class="max-w-max pl-2" role="group">
                        <UiTag @click="emit('selectAddress', address.pk)" :active="address.pk == activeAddressId"
                            class="gap-2 flex-none py-2 h-auto min-w-max">
                            <p class="w-full h-full text-start line-clamp-1">
                                {{ address?.address }}
                            </p>
                        </UiTag>
                    </swiper-slide>
                </swiper-container>
            </ul>
            <div v-else class="text-center py-2">
                آدرسی برای شما ثبت نشده
            </div>
        </div>
        <button @click.prevent="emit('addAddress')" class="flex items-center gap-1 text-xs text-brand">
            <SvgoAdd name="Add" filled class="text-lg" />
            ثبت آدرس جدید
        </button>
    </div>
</template>
<script setup>
const props = defineProps(['addresses', 'activeAddressId'])
const emit = defineEmits(['addAddress', 'selectAddress'])
const activeAddressId = toRef(props, 'activeAddressId')
</script>