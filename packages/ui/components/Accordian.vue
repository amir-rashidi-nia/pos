<template>
    <div>  
        <button @click="isOpen = !isOpen" class="w-full flex items-center justify-between" :aria-expanded="isOpen">
            <p class="text-[17px] font-medium">{{ title }}</p>
            <svg class="w-3 transition-all duration-200 transform" 
                :class="{ 'rotate-180': isOpen, 'rotate-0': !isOpen,}" 
                fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"
                aria-hidden="true">
                <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <div class="pt-4" v-show="isOpen" >
            <slot />
        </div>
    </div>
</template>
<script setup>
const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    default: {
        type: Boolean,
        default: false
    }
});
const isOpen = ref(false);
onMounted(() => {
    isOpen.value = prop.default ? true : false
})
</script>