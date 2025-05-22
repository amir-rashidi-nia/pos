<template>
    <div class="w-full">
        <slot></slot>
        <ClientOnly>
            <ModalsContainer />
        </ClientOnly>
        <PWA />
    </div>
</template>
<script setup>
import { ModalsContainer } from 'vue-final-modal';

</script>