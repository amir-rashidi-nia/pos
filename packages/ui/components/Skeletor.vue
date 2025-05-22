<template>
    <div :class="[ loaderClass ? loaderClass : 'relative overflow-hidden' , 'animate-pulse bg-gradient-to-r from-primary-foreground to-primary-foreground dark:from-dark-primary dark:to-dark-primary-foreground']">
        <div class="animate-pulse absolute top-0 right-0 bottom-0 left-0 "></div>
        <slot />
    </div>
</template>

<script lang="ts">
const LOADER_TYPES = { rectangle: 'rectangle', circle: 'circle' };
const LOADER_CSS_CLASSES = {
    [LOADER_TYPES.rectangle]: '',
    [LOADER_TYPES.circle]: 'rounded-full',
};
type LoaderTypesKeys = keyof typeof LOADER_TYPES;
type LoaderTypesValues = typeof LOADER_TYPES[LoaderTypesKeys];
</script>
<script setup lang="ts">
import { computed, toRefs } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: LOADER_TYPES.rectangle,
        validator(value: LoaderTypesValues) {
            return Object.values(LOADER_TYPES).includes(value);
        },
    },
    bgClass: {
        type: String,
        default: 'bg-gray-300',
    },
    cssClass: {
        type: String,
        default: '',
    },
});
const { type, cssClass } = toRefs(props);
const loaderClass = computed(() => (cssClass.value ? cssClass.value : LOADER_CSS_CLASSES[type.value]));
</script>