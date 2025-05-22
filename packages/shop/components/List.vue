<template>
    <section class="w-full">
        <div v-if="shops?.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-4">
            <ShopItem v-for="item in shops" :key="item.pk" :shop-data="item" />
        </div>
        <div v-else-if="noStores" class="pt-8 flex flex-col gap-2 items-center justify-center">
            <SvgoNoProduct />
            <div class="text-sm text-text-foreground dark:text-dark-text-foreground">هیچ فروشگاهی یافت نشد.</div>
        </div>
        <div v-else-if="loading || ['idle', 'pending'].includes(status)"
                class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
                <ShopLoading />
        </div>
        <div v-if="!finished" ref="loadMore"
            class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
            <UiSpinner />
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';
import shopService from '~shop/lib/services';

const page = ref(1)
const noStores = ref(false)
const loading = ref(false)
const finished = ref(false)

async function fetchShops(page) {
    try {
        loading.value = true;
        let response = await shopService.getAllShops(page);
        if(!response?.data?.next) {
            finished.value = true;
            if (response?.data?.results?.length == 0) {
                noStores.value = true
            }
        }
        return response?.data?.results;
    } catch (error) {
        console.log(error)
    }finally {
        loading.value = false;
    }
}

const { data: shops, status } = await useAsyncData('shops', () => fetchShops(page.value));

async function loadMoreItems (){
    try {
        if (loading.value || finished.value) return;
        page.value++;
        const response = await fetchShops(page.value);
        shops.value?.push(...response);
    } catch (error) {
        finished.value = true;
        console.log(error)
    }
};

const loadMore = ref(null);
useIntersectionObserver(loadMore, loadMoreItems);
</script>