<template>
    <textarea 
        v-bind="props" 
        v-model="localModel" 
        :class="styles({
            variant: variant,
            size: size,
            disabled: disabled,
            class: props.class,
        })"
    />
</template>
<script setup>
import { tv } from "tailwind-variants";
import { toRef, watch } from "vue";

const props = defineProps({
    class: {
        type: [String, Array, Object],
        default: undefined,
    },
    id: {
        type: String,
        default: undefined,
    },
    name: {
        type: String,
        default: undefined,
    },
    placeholder: {
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
    variant: {
        type: String,
        default: "filled",
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
    row: {
        type: Number,
    },
    size: {
        type: String,
        default: "default",
    },
    modelValue: {
        type: [String, Number, Boolean, Object, Array],
        required: false,
    },
});

const emits = defineEmits(['update:modelValue']);
const localModel = toRef(props, "modelValue");
watch(localModel, (newValue) => {
    emits("update:modelValue", newValue);
});

const styles = tv({
    base: "w-full peer resize-none no-scrollbar text-sm font-normal text-text dark:text-dark-text dark:border-dark-text -- ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
    variants: {
        variant: {
            filled: "rounded-lg px-4 py-1.5 mt-2 outline-none placeholder:text-text-foreground dark:placeholder:text-text-foreground-dark bg-primary dark:bg-dark-primary",
            standard: "h-full pt-2 border-b border-primary dark:border-dark-primary bg-transparent --- pb-1.5 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50",
        },
        size: {
            default: "h-24 px-2 py-1.5",
            sm: "rounded-lg px-3",
            lg: "rounded-lg px-4 py-1.5",
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
</script>
