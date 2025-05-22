<template>
    <UiButton
        as="div"
        class="w-full overflow-hidden">
        <input 
            type="text" 
            @keydown.enter="search" 
            v-model.trim="q" 
            placeholder="جستجو"
            class="w-full bg-transparent outline-none placeholder:text-center placeholder:text-text dark:placeholder:text-dark-text" />
    </UiButton>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const q = ref('')
const search = () => {
    let currentPath = router.currentRoute.value.path;
    let queryParams = router.currentRoute.value.query;
    router.push({
        path: currentPath,
        query: {
            ...queryParams,
            q: q.value,
        }
    });
    q.value = ''
}
</script>