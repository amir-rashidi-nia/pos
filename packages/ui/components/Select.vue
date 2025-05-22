<template>
    <div class="relative">
        <select
            v-bind="props"
            v-model="model" 
            :class="styles({
                variant: props.variant,
                size: props.size,
                disabled: props.disabled,
                class: props.class,
            })"
            aria-invalid="true"
            >
                <!-- <option :class="[ variant == 'filled' ? 'bg-background' : 'bg-background dark:bg-dark-background']" disabled value="">یک مورد را انتخاب کنید.</option>
                <template v-for="option in options" >
                    <slot name="option" :option="option" />
                </template> -->
                <slot />
          </select>
          <div :class="['pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3' ]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                </svg>  
          </div>
    </div>
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
    name: {
        type: String,
        default: undefined,
    },
    options: {
        type: [Array, Object],
        default: [],
    },
    placeholder: {
        type: String,
        default: undefined,
    },
    tabindex: {
        type: [String, Number],
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String,
        default: "filled",
    },
    size: {
        type: String,
        default: "default",
    },
});
const model = defineModel()

const styles = tv({
    base: "w-full peer appearance-none px-3 py-2 text-sm font-normal dark:border-dark-text -- ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
    variants: {
        variant: {
            filled: "rounded-lg px-4 outline-none placeholder:text-text-foreground dark:placeholder:text-text-foreground-dark bg-primary dark:bg-dark-primary",
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
</script>
