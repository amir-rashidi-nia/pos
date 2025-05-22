<template>
    <div class="flex justify-between items-center">
        <div class="flex justify-start items-center gap-4">
            <div class="flex items-center justify-center overflow-hidden w-16 h-16 rounded-lg bg-[#F2F3F4]">
                <NuxtImg  placeholder loading="lazy" class="object-cover h-full w-full" :src="data.picture" />
            </div>
            <div class=" max-w-[70%]">
                <h5 class="text-sm">{{ data.name }}</h5>
                <div class="flex items-center gap-1 flex-wrap">
                    <p>{{ splitNumber(data.price) }}</p>
                    <p>-</p>
                    <p class="text-xs">{{ data.variant?.name ? data.variant?.name : "" }}</p>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <p class="select-none">{{ data.quantity }}</p>
            <SvgoCross />
        </div>
    </div>
</template>
<script setup>
defineProps(['data'])
</script>
