<template>
    <section class="relative" >
        <div v-if="products?.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-4"> 
                <ProductCardSimple
                    v-for="item in products" 
                    :key="item.pk"
                    :product-data="item"
                    @click="clickHandler(item)" />
            </div>
            <div v-else-if="noProduct" class="pt-8 pb-[50%] flex flex-col gap-2 items-center justify-center">
                <SvgoNoProduct class="text-4xl" />
                <div class="text-sm text-text-foreground dark:text-dark-text-foreground">هیچ محصولی یافت نشد.</div>
            </div>
            <div v-else-if="loading || ['idle', 'pending'].includes(status)"
                class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
                <ProductLoading />
            </div>
            <div v-if="!finished" ref="loadMore"
                class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
                <UiSpinner />
            </div>
            <ProductModalProduct :product-data="mainProduct" v-model="showModal"/>
        </section>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useShopStore } from '~base/stores/shop'
import { useAuthBaseStore } from '~base/stores/auth'
import { useRoute } from 'vue-router'
import productService from '~product/lib/services';
import { useProductStore } from "~product/stores/product";

const route = useRoute()

const shop = useShopStore();
const product = useProductStore();
const { shopData } = storeToRefs(shop);
const { infiniteScrollingPage: page, infiniteScrollingProducts: products } = storeToRefs(product);
const mainProduct = ref(null);

const showModal = ref(false)
const noProduct = ref(false)
const loading = ref(false)
const finished = ref(false)

const { data, refresh, status } = await useAsyncData('product', () => fetchProducts(page.value), {
    watch: [page],
});

watch(data, (newData) => {
    if (newData) {
        const uniqueProducts = new Map();
        [...products.value, ...newData].forEach(item => {
            uniqueProducts.set(item.pk, item);
        });
        products.value = Array.from(uniqueProducts.values());
    }
}, {
    immediate: true
})

const reset = async () => {
    page.value = 1;
    noProduct.value = false;
    finished.value = false;
    products.value = [];
    await refresh();
};

watch(() => route.query.category, () => {
    reset()
})

watch(() => route.query.tags, () => {
    reset()
})

watch(() => route.query.q, () => {
    reset()
})

async function fetchProducts(page) {
    try {
        const category = route.query.category || '0';
        const tags = route.query.tags || '0';
        const q = route.query.q;
        loading.value = true;
        let response;
        if (q?.length > 0) {
            response = await productService.getProductsSearch(shopData.value.eng_name, shopData.value.pk, q, page);
        } else {
            response = await productService.getProducts(shopData.value.eng_name, category, tags, page);
        }
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
        console.log(error)
    }finally {
        loading.value = false;
    }
}

async function loadMoreItems (){
    if (loading.value || finished.value) return;
    page.value++;
};

const loadMore = ref(null);
useIntersectionObserver(loadMore, loadMoreItems);

function clickHandler(product){
    mainProduct.value = product;
    showModal.value = true
}
</script>