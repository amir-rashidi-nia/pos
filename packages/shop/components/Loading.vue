<template>
    <ClientOnly>
        <div v-for="_ in repeat" class="card">
            <div class="card__image" >
                <UiSkeletor class="rounded-xl w-full min-h-[480px]"/>
            </div>
        </div>
    </ClientOnly>
</template>
<script setup>
import { ref } from 'vue';
const repeat = ref('')
if(import.meta.client){
    repeat.value = window.innerWidth < 768 ? 4 : 6             
}
</script>