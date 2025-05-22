<template>
    <VueFinalModal
        dir="rtl"
        :model-value="modelValue"
        :clickToClose="clickToClose" 
        overlay-transition="vfm-fade" 
        :content-transition="`${variant == 'mobile' ? 'vfm-slide-down' : 'ovfm-fade'}`" 
        overlayClass="mx-auto left-0 right-0 absolute bottom-0 transition bg-[rgba(0,0,0,.7)]" 
        contentStyle="overflow-y: scroll;"
        swipe-to-close="down"
        @closed="closeModalHandler"
        :class="styles({
            variant: variant,
            class: props.class,
        })"
        :content-class="contentStyles({
            variant: variant,
            class: props.contentClass,
        })"
        >
        <div v-if="variant == 'mobile'" class="sticky sm:hidden top-0 w-full py-2 z-20 bg-primary dark:bg-dark-primary-foreground">
            <span class="block w-10 h-1 rounded-lg mx-auto bg-text-foreground dark:bg-text-foreground-dark"></span>
        </div>
        <SvgoPlus v-if="variant == 'simple'" @click="closeModalHandler" class="absolute right-1 top-1 cursor-pointer z-50 text-4xl rotate-45" />
        <slot></slot>
    </VueFinalModal>
</template>
<script setup>
import { tv } from 'tailwind-variants';
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  variant: {
    default: 'simple',
    type: String,
  },
  class: [String, Array, Object],
  contentClass: [String, Array, Object],
  clickToClose: {
    default: true,
    type: Boolean
  },
});
const emit = defineEmits(['update:modelValue', 'closed']);

function closeModalHandler() {
    emit('update:modelValue', false)
    emit('closed')
}

const contentStyles = tv({
    base: "font-iranYekan bg-primary dark:bg-dark-primary-foreground text-text dark:text-dark-text no-scrollbar",
    variants: {
        variant: {
            simple: "relative max-w-[418px] max-h-[650px] w-full px-4 pt-3 pb-4 rounded-xl overflow-y-scroll",
            mobile: "absolute bottom-0 left-0 right-0 w-screen transition-all max-w-4xl mx-auto rounded-t-xl text-sm h-max min-h-[20vh] max-h-[75vh] sm:relative sm:max-w-[500px] sm:max-h-[600px] sm:rounded-xl",
        },
    },
    defaultVariants: {
        variant: "simple",
    },
});
const styles = tv({
    base: "",
    variants: {
        variant: {
            simple: "flex justify-center items-center px-4",
            mobile: "sm:flex sm:justify-center sm:items-center sm:px-8",
        },
    },
    defaultVariants: {
        variant: "simple",
    },
});
</script>