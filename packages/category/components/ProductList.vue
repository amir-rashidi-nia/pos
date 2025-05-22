<template>
    <section class="relative px-6 pb-4">
        <p class="w-full text-text-foreground dark:text-dark-text-foreground text-[.8rem] font-medium">{{ count }} محصول</p>
        <div v-if="products?.length > 0" class="pt-4 grid grid-cols-2 gap-4"> 
                    <ProductCardSimple
                        v-for="item in products"
                        :key="item.pk"
                        :product-data="item" 
                        path="/product" />
            </div>
            <div v-else-if="noProduct" class="pt-8 pb-[50%] flex flex-col gap-2 items-center justify-center">
                <SvgoNoProduct class="text-4xl" />
                <div class="text-sm text-text-foreground dark:text-dark-text-foreground">هیچ محصولی یافت نشد.</div>
            </div>
            <div v-else-if="loading || ['idle', 'pending'].includes(status)"
                class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
                <CategoryLoading />
            </div>
            <div v-if="!finished" ref="loadMore"
                class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
                <UiSpinner />
            </div>
        </section>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useShopStore } from '~base/stores/shop'
import { useRoute } from 'vue-router'
import services from '~category/lib/services';

const route = useRoute()
const shop = useShopStore();
const count = ref(null);
const { shopData } = storeToRefs(shop);

const noProduct = ref(false)
const loading = ref(false)
const finished = ref(false)
const page = ref(1)

const { data: products, refresh, status } = await useAsyncData('product', () => fetchProducts(page.value));

const reset = async () => {
    page.value = 1;
    noProduct.value = false;
    finished.value = false;
    products.value = [];
    await refresh();
};

watch(() => route.query.tags, () => {
    reset()
})

async function fetchProducts(page) {
    try {
        const tags = route.query.tags || '0';
        loading.value = true;
        let response = await services.getCategoryProducts(shopData.value.eng_name, route.params?.categoryId, tags, page);
        count.value = response?.data.count
        if(!response?.data?.next) {
            finished.value = true;
            if (response?.data?.results?.length == 0) {
                noProduct.value = true
                return
            }
        }
        return response?.data?.results;
    } catch (error) {
        finished.value = true;
    }finally {
        loading.value = false;
    }
}

async function loadMoreItems (){
    if (loading.value || finished.value) return;
    try {
        page.value++;
        const response = await fetchProducts(page.value);
        products.value?.push(...response);
    } catch (error) {
        console.log(error)
    }
};

const loadMore = ref(null);
useIntersectionObserver(loadMore, loadMoreItems);
</script>