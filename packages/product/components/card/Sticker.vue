<template>
    <span dir="ltr"
        v-if="productData?.is_new || !productData?.is_active || !!productData?.discount_percent || props.productData?.stock == 0"
        :class="`left-${position}`"
        class="text-xs md:text-sm absolute z-10 left-2.5 top-2.5 text-white bg-[#2f2f2f] flex items-center justify-center pb-0.5 pt-1 px-1.5 rounded-md">
        <p v-if="productData?.stock == 0">اتمام موجودی</p>
        <p v-else-if="!productData?.is_active">غیر فعال</p>
        <p v-else-if="!!productData?.discount_percent">{{ productData?.discount_percent }}% off</p>
        <p v-else-if="productData?.is_new">جدید</p>
    </span>
</template>
<script setup>
const props = defineProps({
    productData: {
        required: true,
        type: Object
    },
    position: {
        required: true,
        type: Number
    },
})
</script>