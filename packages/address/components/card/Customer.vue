<template>
    <div class="flex justify-start items-start w-full gap-4">
        <div class="flex items-center justify-center overflow-hidden w-24 h-24 md:w-32 md:h-32 rounded-lg bg-background dark:bg-dark-background flex-none">
            <BaseMapShow class="w-full h-full" :zoom-control="false" :coordinate="[addressData?.lat, addressData?.lng]" />
        </div>
        <div class="text-sm md:text-base">
            <address class="text-sm md:text-base">
                {{ addressData?.address }}
            </address>
            <span class="flex items-center py-2 text-brand">
                <SvgoLocation filled />
                <a class="text-xs  block px-1" :href="`https://www.google.com/maps?q=${addressData?.lat},${addressData?.lng}`" target="_blank">مشاهده آدرس</a>
            </span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    addressData: {
        type: Object,
        required: true
    }
})
</script>
