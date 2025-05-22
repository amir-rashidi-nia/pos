<template>
    <input 
        ref="inputRef" 
        v-bind="props" 
        v-model="model" 
        :class="styles({
            variant: props.variant,
            size: props.size,
            disabled: props.disabled,
            class: props.class,
        })"
    >
</template>
<script setup>
import { tv } from "tailwind-variants";
const props = defineProps({
    class: {
        type: [String, Array, Object],
        default: undefined,
    },
    id: {
        type: String,
        default: undefined,
    },
    placeholder: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: undefined,
    },
    tabindex: {
        type: [String, Number],
        required: false,
    },
    inputmode: {
        type: String,
        default: "text",
    },
    maxLength: {
        type: Number,
        required: false,
        default: 524288,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "text",
    },
    variant: {
        type: String,
        default: "filled",
    },
    size: {
        type: String,
    },
});
const model = defineModel()
const styles = tv({
    base: "w-full peer px-3 py-2 text-sm font-normal text-text dark:text-dark-text dark:border-dark-text appearance-none -- ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-none focus-visible:ring-border focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
    variants: {
        variant: {
            filled: "rounded-lg px-4 outline-none placeholder:text-text-foreground dark:placeholder:text-text-foreground-dark bg-primary-foreground dark:bg-dark-primary",
            standard: "h-full border-b border-primary dark:border-dark-primary bg-transparent --- pt-8 pb-1.5 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50",
        },
        size: {
            default: "h-[2.2rem] px-2 py-1.5",
            sm: "h-[1.9rem] rounded-lg px-3",
            lg: "h-[2.2rem] rounded-lg px-4 py-1.5",
        },
        disabled: {
            true: "pointer-events-none opacity-50",
        },
    },
    defaultVariants: {
        variant: "filled",
        size: "default",
    },
});
const inputRef = useTemplateRef('inputRef')
const focusInput = async () => {
  await nextTick()
  if (inputRef.value) {
    inputRef.value.focus();
  }
};
defineExpose({
  focusInput
})
</script>
