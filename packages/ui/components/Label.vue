<template>
    <label 
        :for="props.for" 
        :class="styles({
            variant: props.variant,
            size: props.size,
            disabled: props.disabled,
            class: props.class,
        })"  >
        <slot />
    </label>
</template>

<script setup>
import { tv } from 'tailwind-variants';

const props = defineProps({
    class: {
        type: [String, Array, Object],
        default: undefined,
    },
    for: {
        type: String,
        default: undefined,
    },
    variant: {
        type: String,
        default: 'filled',
    }
});

const styles = tv({
    base: "block text-sm font-normal",
    variants: {
        variant: {
            filled: "text-text dark:text-dark-text",
            standard: "after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex items-center gap-1 h-full w-full select-none !overflow-visible truncate leading-tight text-text-foreground dark:text-dark-text-foreground transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent",
        }
    },
    disabled: 'text-text-foreground',
    defaultVariants: {
        variant: "filled",
    },
});
</script>