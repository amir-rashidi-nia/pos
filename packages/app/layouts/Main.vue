<template>
    <div
        class="relative flex min-h-screen overflow-hidden">
        <LayoutSidebar/>
        <div class="relative flex flex-1 sm:pr-14 xl:pr-44 flex-col overflow-y-auto overflow-x-hidden no-scrollbar w-full"
            style="overflow-anchor: none;">
            <LayoutHeader />
            <main class="main mt-[52px]" style="touch-action: manipulation;">
                <slot />
            </main>
        </div>
        <LazyAuthModalEnter />
    </div>
</template>
<script setup>
</script>