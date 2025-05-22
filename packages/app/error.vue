<template>
    <div
        class="mx-auto flex min-h-screen w-full flex-col items-center bg-background dark:bg-dark-background pt-36 font-iranYekan text-text dark:text-dark-text">
        <div class="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-4">
            <h2 class="text-center text-3xl font-bold">{{ error.statusCode }}</h2>
            <h1 class="text-center text-2xl font-bold">
                {{ error.statusMessage }}
            </h1>
            {{ error }}
        </div>
    </div>
</template>
<script setup>
defineProps(['error']);
</script>