<template>
    <div class="w-full">
        <div class="pt-4 flex justify-center gap-2 px-4 -z-10 xl:hidden w-full">
            <UiButton to="/register" class="w-full">
                ثبت فروشگاه
            </UiButton>
            <UiSearchbar />
        </div>
        <ShopList class="pt-4" />
    </div>
</template>
<script setup>
</script>