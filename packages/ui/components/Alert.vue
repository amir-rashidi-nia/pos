<template>
    <VueFinalModal 
        :model-value="modelValue" 
        overlay-transition="vfm-fade" 
        content-transition="vfm-slide-up"
        class="flex justify-center items-center px-8" 
        content-class="relative max-w-[418px] max-h-[500px] w-full
        pt-3 pb-4 rounded-xl overflow-y-scroll no-scrollbar
        font-iranYekan bg-background dark:bg-dark-primary-foreground 
        text-lightext dark:text-dark-text"
        overlayClass="mx-auto left-0 right-0 absolute bottom-0 transition" 
        @closed="$emit('update:modelValue', false)">

        <div class="relative w-full flex flex-col items-center justify-between">
            <h3 v-if="!!title" class="text-xl leading-none py-4 font-bold">{{ title }}</h3>
            <p v-if="!!caption" class="text-center px-4 text-text-foreground dark:text-dark-text-foreground">{{ caption }}</p>
            <div class="w-full mx-auto px-4 flex justify-center gap-2 pt-6">
                <UiButton @click.prevent="acceptHandler" v-if="acceptBtn" class="w-full font-bold">
                    {{ acceptBtn }}
                </UiButton>
                <UiButton @click.prevent="emit('update:modelValue', false)" v-if="refuseBtn" class="w-full font-bold">
                    {{ refuseBtn }}
                </UiButton>
            </div>
        </div>
    </VueFinalModal>
</template>
<script setup>
import { VueFinalModal } from 'vue-final-modal'
const emit = defineEmits(['update:modelValue', 'accept'])
const props = defineProps({
    modelValue: {
        required: true
    },
    title: {
        type: String
    },
    caption: {
        type: String
    },
    acceptBtn: {
        default: 'تایید',
        type: String
    },
    refuseBtn: {
        default: 'خیر',
        type: String
    }
})
function acceptHandler() {
    emit('accept');
    emit('update:modelValue', false)
}
</script>