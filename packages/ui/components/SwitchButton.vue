<template>
    <div  class="flex items-center">
        <span dir="ltr" class="my-3 text-sm sm:text-base xl:text-lg font-medium" >{{ label }} <span class="text-xs xl:text-sm text-text-foreground dark:text-dark-text-foreground">{{description }}</span></span>
        <label class="relative inline-flex items-center cursor-pointer mr-auto">
            <input 
                type="checkbox" 
                class="sr-only peer" 
                :checked="modelValue"
                @change="$emit('update:modelValue', $event.target.checked)" >
            <div class="switch w-8 h-3.5 rounded-full bg-text-foreground dark:bg-dark-text-foreground peer-checked:bg-brandActive"></div>
            <div class=" peer-checked:bg-brand bg-text dark:bg-dark-text peer-checked:translate-x-full absolute inset-y-0 my-auto left-[-6px] rounded-full h-5 w-5 transition-all"></div>
        </label>
    </div>
</template>
<script setup>
defineProps(['modelValue', 'placeholder', 'label', 'lg', 'description', 'type'])
defineEmits(['update:modelValue'])
</script>
