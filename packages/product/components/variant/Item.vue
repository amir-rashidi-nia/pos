<template>
    <button 
        :class="styles({
            disabled: props.disabled,
            active: props.active,
            size: props.size,
            class: props.class,
        })">
        <slot />
    </button>
</template>
<script setup>
import { tv } from "tailwind-variants";

const props = defineProps({
    active: {
        default: false,
        type: Boolean,
    },
    size: {
        default: 'default',
        type: String,
    },
    disabled: {
        default: false,
        type: Boolean,
    },
    class: {
        default: false,
        type: [String, Array, Object]
    }
});
const styles = tv({
    base: "transition-all text-xs text-center align-middle rounded-lg px-2 min-w-[60px] bg-primary dark:bg-dark-primary-foreground",
    variants: {
        active: {
            true: "outline-[1px] outline-offset-[3px] rounded-md"
        },
        size: {
            default: "h-[1.88rem]",
            lg: "h-10",
        },
        disabled: {
            true: "pointer-events-none opacity-50",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
</script>