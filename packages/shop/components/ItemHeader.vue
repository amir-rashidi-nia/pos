<template>
    <NuxtLink :to="`${protocol}://${shopData?.eng_name}.${clientURL}`" external
        class="absolute bg-gradient-to-t from-transparent via-[#00000075] to-[#000000c5] top-0 left-0 w-full h-fit z-10 flex justify-between px-3 pt-3 pb-[20%] items-center text-white">
        <div class="flex gap-2 items-center">
            <NuxtImg placeholder loading="lazy" :src="props.shopData?.logo"
                class="h-[2.3rem] w-[2.3rem] rounded-full" :alt="props.shopData?.name" />
            <div class="flex flex-col justify-center items-start gap-1">
                <div class="flex items-center gap-1">
                    <h2 class="text-[0.9rem]">
                        {{ props.shopData?.eng_name }}
                    </h2>
                    <SvgoVerify class="text-md text-brand" name="Verify" />
                </div>
                <div class="flex items-center">
                    <p class="text-[0.7rem]">{{ props.shopData?.name }}</p>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <div class="flex flex-col items-center justify-center">
                <p class="font-bold">
                    {{ numberFormater(props.shopData?.followers_count) }}
                </p>
                <p class="font-thin text-xs">
                    دنبال کننده ها
                </p>
            </div>
            <div class="flex flex-col items-center justify-center">
                <p class="font-bold">
                    {{ props.shopData?.product_count }}
                </p>
                <p class="font-thin text-xs">
                    محصولات
                </p>
            </div>
        </div>
    </NuxtLink>
</template>
<script setup>
const props = defineProps(['shopData']);
const clientURL = import.meta.env.VITE_CLIENT_URL;
const protocol = import.meta.env.VITE_PROTOCOL_URL;
</script>