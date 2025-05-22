<template>
    <div>
        <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh" class="fixed bottom-0 left-0 right-0 w-full rounded-b text-xl text-center shadow-xl flex z-[100] items-center py-2 px-4 text-text dark:text-dark-text bg-primary-foreground dark:bg-dark-primary-foreground mx-auto"
            role="alert">
            <button color="danger w-[40%]" @click="$pwa?.cancelInstall">
                <SvgoPlus class=" rotate-45 text-xl"/>
            </button>
            <div class="flex items-center text-xs sm:text-sm justify-center w-full">
                <p class="">
                    نصب وب اپلیکیشن بیزی بای
                </p>
                <button class="text-brand mr-4" @click="$pwa?.install">دریافت</button>
            </div>
        </div>
        <div v-if="$pwa?.needRefresh && isCloseAlert == false" class="fixed bottom-0 left-0 right-0 w-full rounded-b text-xl text-center shadow-xl flex z-[100] items-center py-2 px-4 text-text dark:text-dark-text bg-primary-foreground dark:bg-dark-primary-foreground mx-auto">
            <button aria-label="close alert" color="danger w-[40%]" @click="isCloseAlert = true">
                <SvgoPlus class="text-text dark:text-dark-text rotate-45 text-xl"/>
            </button>
            <div class="flex items-center text-xs sm:text-sm justify-center w-full">
                <p class="">
                    بروزرسانی وب اپلیکیشن در دسترس است
                </p>
                <button class="text-brand mr-4" @click="$pwa?.updateServiceWorker()">دریافت</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { $pwa } = useNuxtApp();
const isCloseAlert = ref(false);
</script>