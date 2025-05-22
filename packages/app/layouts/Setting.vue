<template>
    <div
        class="w-full flex min-h-screen overflow-hidden">
        <LayoutSidebar></LayoutSidebar>
        <div
            class="relative flex sm:pr-14 xl:pr-32 flex-1 flex-col w-full overflow-y-scroll overflow-x-hidden no-scrollbar mx-auto">
            <LayoutPanelHeader></LayoutPanelHeader>
            <section class="w-full max-w-4xl mx-auto pb-8 sm:pb-0">
                <slot></slot>
            </section>
        </div>
    </div>
</template>
<script setup>
</script>