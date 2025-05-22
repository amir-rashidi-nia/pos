<template>
    <swiper-container 
        ref="containerRef" 
        class="relative w-full max-h-[54vh] xl:max-h-none min-h-[40vh] xl:h-full z-10 overflow-hidden" 
        :slidesPerView="1" 
        :cssMode="true" 
        :centeredSlides="true" 
        :zoom="true" 
        :lazy="true"
        :pagination='{
            "clickable": true,
           "dynamicBullets": true
        }' >
        <swiper-slide v-for="url in data">
            <div v-if="isVideo(url)" class="flex items-center justify-center w-full h-full overflow-hidden dark:bg-dark light:bg-[#F2F3F4]">       
                <video class="object-cover w-full md:w-[calc(100%-15rem)] h-full -mb-1" :src="url" autoplay loop muted>  
                </video>
            </div>
            <div v-else class="flex items-center justify-center w-full h-full overflow-hidden dark:bg-dark light:bg-[#F2F3F4]">
                <div class="swiper-zoom-container object-cover">
                    <NuxtImg placeholder loading="lazy" class=" object-cover h-full" :src="url" alt="image of"/>
                </div>
            </div>
        </swiper-slide>
        <SvgoNext @click="swiper.slideNext" class="hidden xl:block absolute z-50 top-0 bottom-0 my-auto left-4 cursor-pointer fill-text-foreground dark:fill-dark-text-foreground" />
        <SvgoPrev @click="swiper.slidePrev" class="hidden xl:block absolute z-50 top-0 bottom-0 my-auto right-4 cursor-pointer fill-text-foreground dark:fill-dark-text-foreground" />
    </swiper-container>
</template>
<script setup>
const props = defineProps(['data']);
const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
  mousewheel: true,
})
</script>
<style>
.swiper-pagination {
    --swiper-pagination-bullet-horizontal-gap: 2px;
    --swiper-pagination-bullet-width: 6px;
    --swiper-pagination-bullet-height: 6px;
}
</style>

