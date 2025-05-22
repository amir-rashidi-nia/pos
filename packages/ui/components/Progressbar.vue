<template>
    <div class="relative size-12">
        <svg class="size-full stroke-2 -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-brand"
                stroke-width="4"></circle>
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 "
                stroke-width="4" stroke-dasharray="100" :stroke-dashoffset="precent" stroke-linecap="round"></circle>
        </svg>
    </div>
</template>
<script setup>
const props = defineProps({
    precent: {
        required: true
    }
})
const precent = toRef(props, 'precent');
</script>
