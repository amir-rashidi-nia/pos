<template>
    <div class="w-full">
        <div class="flex justify-center gap-2 px-4 pt-4 -z-10 xl:hidden">
            <UiButton @click="showCategoryModal = true" class="w-full">
                <div class="w-full flex items-center justify-center">
                    <p class="text-center">
                        دسته بندی ها
                    </p>
                    <SvgoChevronDown filled class="mr-1 text-md pointer-events-none" />
                </div>
            </UiButton>
            <UiSearchbar :ForMobile="true" />
        </div>
        <div class="flex items-center justify-between px-4 pb-3 pt-6">
            <h2 class="text-[.9rem] xl:text-xl font-semibold leading-none">
                {{ mainCategory }}
            </h2>
            <p @click="showTagContainer = !showTagContainer" class="text-[.8rem] xl:text-xl cursor-pointer text-brand ">
                دیدن همه
            </p>
        </div>
        <CategoryTagSwiper v-model="showTagContainer" />
        <ProductList />
        <LazyCategoryModalList />
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop'

const route = useRoute()
const showTagContainer = ref(false);

const shop = useShopStore()
const { shopCategoris, showCategoryModal } = storeToRefs(shop);

onMounted(() => {
    if (route.query.tags) {
        showTagContainer.value = true
    }
})

const mainCategory = ref('')
const setMainCategory = () => {
    let queryParams = route.query
    if (queryParams?.q) {
        mainCategory.value = `نتایج جستجو "${queryParams?.q}"`;
    } else {
        if (queryParams?.category == 0 || !queryParams?.category) {
            mainCategory.value = 'محصولات ویژه';
        } else if (queryParams?.category == -1) {
            mainCategory.value = 'پیشنهاد ویژه';
        } else {
            mainCategory.value = shopCategoris.value.find(c => c.pk == route.query.category)?.name
        }
    }
}

watch(() => route.query, () => {
    setMainCategory()
}, { immediate: true })
</script>
