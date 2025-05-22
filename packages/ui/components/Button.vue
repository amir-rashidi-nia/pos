<template>
    <component
        :is="elementType"
        :class="buttonStyles({
            disabled: disabled || loading,
            variant: variant,
            size: size,
            class: props.class,
        })"
        :disabled="disabled || loading"
        :to="to"
        :external="external"
        :href="href"
        :target="target"
        :type="type"
        @click="onClick"
    >
        <UiSpinner v-if="disabled || loading"/>
        <slot v-else >{{ text }}</slot>
    </component>
</template>

<script setup>
import { UiSpinner } from "#components";
import { tv } from "tailwind-variants";
import { computed, resolveComponent } from "vue";

const buttonStyles = tv({
    base: "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-normal -- ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
    variants: {
        variant: {
            default:"border-primary dark:border-dark-primary bg-primary-foreground dark:bg-dark-primary text-text dark:text-dark-text",
            secondary: "bg-brand text-white hover:bg-brand-foreground border-brand",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
            default: "h-[2.2rem] px-2 py-1.5",
            sm: "h-[2.2rem] rounded-lg px-3",
            lg: "h-10 rounded-lg px-4",
            "icon-sm": "h-9 w-9",
            icon: "h-10 w-10",
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

const props = defineProps({
    type: {
        type: String,
        default: "button",
    },
    external: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    onClick: Function,
    to: [String, Object],
    href: String,
    as: String,
    class: [String, Array, Object],
    variant: {
        type: String,
        default: "default",
    },
    size: {
        type: String,
        default: "default",
    },
    text: String,
    target: String,
})


const elementType = computed(() => {
    if (props.as) return props.as;
    if (props.href || props.to) return resolveComponent("NuxtLink");
    return "button";
});
</script>