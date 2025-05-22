<template>
    <div class="relative w-full pb-[100%] col-span-1 sm:mx-0 min-h-[480px]">
        <div class="store-cart absolute h-full w-full rounded-xl overflow-hidden">
            <ShopItemHeader :shop-data="props.shopData"/>
            <swiper-container 
                class="relative w-full h-full" 
                dir="ltr" 
                :slidesPerView="1"
                :centeredSlides="true" 
                :lazy="true" 
                :speed="500" 
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                }" 
                :touchReleaseOnEdges="true">
                <swiper-slide v-for="item in props.shopData?.picture_paths">
                    <div v-if="isVideo(item[0])"  @click="goToPro(item[1])" class="relative z-0 w-full h-full object-cover bg-primary-foreground dark:bg-dark-primary-foreground">
                        {{ item }}
                        <div class="absolute inset-0 flex items-center justify-center bg-dark-primary-foreground dark:bg-dark-primary-foreground">
                            <NuxtImg placeholder loading="lazy" v-if="props.shopData?.logo" :src="props.shopData?.logo" class="h-20 w-20 rounded-full" :alt="props.shopData?.name" />
                        </div>
                        <video ref="myVideo" :src="item[0]"
                            class="absolute inset-0 z-10 object-cover w-full h-full cursor-pointer" autoplay loop muted>
                        </video>
                        <span class="absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-black/[0.025]"></span>
                    </div>

                    <div v-else  @click="goToPro(item[1])"
                        class="relative flex items-center justify-center  w-full h-full object-cover bg-primary-foreground dark:bg-dark-primary-foreground">
                        <NuxtImg placeholder loading="lazy" class="absolute inset-0 z-10 object-cover h-full w-full cursor-pointer bg-primary-foreground dark:bg-dark-primary-foreground
                                after:from-black after:to-transparent after:bg-gradient-to-t after:z-50" :src="item[0]" :alt="props.shopData?.name"/>
                        <span class="absolute inset-0  h-full w-full gradi from-black/30 to-black/[0.01] bg-gradient-to-t z-20"></span>
                    </div>
                </swiper-slide>
            </swiper-container>
            <div
                class="absolute buttom-0  bg-gradient-to-b from-transparent via-[#00000075] to-[#000000c5] -translate-y-full left-0 w-full h-fit z-10 justify-center flex flex-col gap-6 px-4 pb-6 pt-[20%] items-end text-white">
                <NuxtLink 
                    :to="`${protocol}://${shopData?.eng_name}.${clientURL}`" 
                    :external="true"
                    aria-label="buy something">
                    <SvgoChat filled class="text-3xl"></SvgoChat>
                </NuxtLink>
                <NuxtLink 
                    :to="`${protocol}://${shopData?.eng_name}.${clientURL}`" 
                    :external="true"
                    aria-label="buy something">
                    <SvgoBag class="text-3xl"></SvgoBag>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const clientURL = import.meta.env.VITE_CLIENT_URL;
const protocol = import.meta.env.VITE_PROTOCOL_URL;
const props = defineProps({
    shopData: {
        type: Object,
        required: true
    }
})
function goToPro(gui){
    window.location.href = `https://${props.shopData?.eng_name}.busibuy.ir/${gui}`
}
</script>
<style>
.store-cart .swiper-button-prev {
    display: none;
    cursor: pointer !important;
}
.store-cart .swiper-button-next {
    display: none;
    cursor: pointer !important;
}
</style>