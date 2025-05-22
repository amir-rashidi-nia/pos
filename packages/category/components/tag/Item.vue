<template>
    <button 
        :disabled="disable"
        :class="['text-xs text-center align-middle min-w-min rounded-lg px-2 bg-primary dark:bg-dark-primary text-text dark:text-dark-text',
         { 'w-full': wFull }, lg ? `h-10` : 'h-[1.88rem]' , { 'dark:text-text dark:bg-dark-text bg-text text-white' : active }]">
            <slot></slot>
    </button>
</template>
<script setup>
const props = defineProps({
    active: {
        default: false,
        type: Boolean,
    },
    disable: {
        default: false,
        type: Boolean,
    },
    wFull: {
        default: false,
        type: Boolean
    },
    lg: {
        default: false,
        type: Boolean
    }
});
</script>