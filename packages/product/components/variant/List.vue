<template>
    <div class="relative w-full">
        <div class="flex items-center gap-1 px-4">
            <SvgoInfo class="text-xs text-text-foreground dark:text-dark-text-foreground" />
            <p class="text-[0.6rem] text-text-foreground dark:text-dark-text-foreground">
                ویژگی موردنظر خود را انتخاب کنید.
            </p>
        </div>
        <ClientOnly>
            <swiper-container :slides-per-view="'auto'" :mousewheel="true" :simulate-touch="true"
                class="no-scrollbar flex gap-2">
                <swiper-slide v-for="variant in props.variants" :key="variant.pk"
                    class="max-w-max py-2 pl-2 first:mr-4">
                    <ProductVariantItem :key="variant.pk" class="font-medium" :active="variant.pk == props.activeVariantId"
                        @click.prevent="emit('changeVariant', variant)">{{ variant.name }}</ProductVariantItem>
                </swiper-slide>
            </swiper-container>
            <template #fallback>
                <UiSkeletor class="max-w-[60px] h-[1.88rem] rounded-lg my-2 mr-4" />
            </template>
        </ClientOnly>
    </div>
</template>
<script setup>
const props = defineProps({
    variants: {
        type: Array,
        default: [],
    },
    activeVariantId: {
        type: Number,
        required: false
    }
});
const emit = defineEmits(['changeVariant'])
</script>