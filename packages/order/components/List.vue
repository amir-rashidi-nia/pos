<template>
    <div class="py-4 w-full min-h-screen">
        <div v-if="orders.length > 0" class="flex flex-col md:grid md:grid-cols-2 gap-4 w-full">
            <OrderItem v-for="order in orders" @showModal="showProductModalHandler(order)" :data="order" />
        </div>
        <div v-else-if="noResult" class="py-8 text-center text-base lg:text-xl">
            سفارش وجود ندارد.
        </div>
        <div v-if="!finished" ref="loadMore"
            class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar pt-4">
            <UiSpinner />
        </div>
        <OrderModalProducts v-model="showProductsModal" :data="mainOrder" />
    </div>
</template>
<script setup>
import services from '~order/lib/services';

const mainOrder = ref(null);
const showProductsModal = ref(false)
function showProductModalHandler(product) {
    mainOrder.value = product
    showProductsModal.value = true
}
provide('track' , mainOrder);

const orders = ref([]);
const page = ref(1)
const noResult = ref(false)
const loading = ref(false)
const finished = ref(false)

async function fetchOrders(page) {
    try {
        loading.value = true;
        let response = await services.getOrders(page);
        if(!response?.data?.next) {
            finished.value = true;
            if (response?.data?.results?.length == 0) {
                noResult.value = true
            }
        }
        return response?.data?.results;
    } catch (error) {
        console.log(error)
    }finally {
        loading.value = false;
    }
}

async function loadMoreItems (){
    try {
        if (loading.value || finished.value) return;
        const response = await fetchOrders(page.value);
        page.value++;
        orders.value?.push(...response);
    } catch (error) {
        finished.value = true;
        console.log(error)
    }
};

const loadMore = ref(null);
useIntersectionObserver(loadMore, loadMoreItems);
</script>