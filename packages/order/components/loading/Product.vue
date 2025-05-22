<template>
    <div v-for="_ in 2" class="orderCard w-full flex justify-between items-center">
        <div class="card__image flex gap-2 items-center">
            <UiSkeletor class="w-16 h-16 rounded-lg" />
            <div>
                <h2>
                    <UiSkeletor width="70" height="10" class="my-2 rounded-lg" />
                </h2>
                <p>
                    <UiSkeletor width="90" height="10" class="rounded-lg" />
                </p>
            </div>
        </div>
        <div class="card__meta">
            <p>
                <UiSkeletor width="30" height="10" class="rounded-lg" />
            </p>
        </div>
    </div>
</template>
<script setup>
</script>