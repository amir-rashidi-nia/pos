<template>
    <Teleport to="body">
            <transition>
                <div v-show="props.modelValue"
                    :class="['container z-[9999] fixed left-0 right-0 mx-auto bottom-4 xl:pr-64 font-iranYekan' , {'max-w-md xl:max-w-2xl': !props.whidth}]"
                    :style="`width: ${props.whidth}px`">
                    <div class="flex items-center z-[9999] px-4 h-16 mx-2 rounded-lg bg-primary-foreground/95 dark:bg-dark-primary-foreground/95 text-text dark:text-dark-text">
                        <slot />
                    </div>
                </div>
            </transition>
    </Teleport>
</template>
<script setup>
const props = defineProps(['modelValue' , 'time' , 'whidth'])
const emit = defineEmits(['update:modelValue'])
watch(() => props.modelValue,
    () => {
        if (props.modelValue) {
            setTimeout(() => {
                emit('update:modelValue', false)
            }, props.time ? props.time :  4000)
        }
    }
)
</script>
