<template>
    <UiDialog variant="mobile" v-model="showCategoryModal" @closed="selectedCategory = null">
        <div v-if="!selectedCategory" class="relative z-10 flex flex-col items-center justify-between ">
            <h3 class="sticky top-5 sm:pt-4 sm:top-0 z-20 w-full text-center text-[1.06rem] font-semibold pb-2 pt-1 border-b-[0.75px] border-primary dark:border-dark-primary bg-background dark:bg-dark-primary-foreground">
                دسته بندی ها
            </h3>
            <ul class="w-full -z-10 flex flex-col pb-4 justify-start items-start">
                <li v-for="category in activeCategory" :key="category.pk" @click.prevent="selectCategoryHandler(category)"
                    class="flex justify-between py-4 font-light w-full text-[1.06rem] cursor-pointer px-4">
                    <p>
                        {{ category.name }}
                    </p>
                    <SvgoChevronDown v-if="category?.subcategories.length > 0" filled class="rotate-90 text-sm"/>
                </li>
                <li @click.prevent="search(-1)" class="py-4 font-light w-full text-[1.06rem] cursor-pointer px-4">فروش ویژه</li>
    
                <li @click.prevent="search(0)" class="py-4 font-light w-full text-[1.06rem] cursor-pointer px-4">همه محصولات</li>
            </ul>
        </div>
        <div v-else class="relative z-10 flex flex-col items-center justify-between ">
            <div class="sticky top-5 sm:pt-4 sm:top-0 z-20 w-full flex items-center justify-center text-center text-[1.06rem] font-semibold pb-2 pt-1 border-b-[0.75px] border-primary dark:border-dark-primary bg-background dark:bg-dark-primary-foreground">
                <h3>
                    {{ selectedCategory.name }}
                </h3>
                <SvgoBack filled class="text-2xl absolute rotate-180 right-4" @click.prevent="selectedCategory = null"/>
            </div>
            <ul class="w-full -z-10 flex flex-col pb-4 justify-start items-start">
                <li @click.prevent="search(selectedCategory.pk)"
                    class="flex justify-between py-4 font-light w-full text-[1.06rem] cursor-pointer px-4">
                    <p>
                        {{ selectedCategory.name }}
                    </p>
                </li>
                <li v-for="category in selectedCategory?.subcategories" :key="category.pk" @click.prevent="selectCategoryHandler(category)"
                    class="flex justify-between py-4 font-light w-full text-[1.06rem] cursor-pointer px-4">
                    <p>
                        {{ category.name }}
                    </p>
                    <SvgoChevronDown v-if="category?.subcategories.length > 0" filled class="rotate-90 text-sm"/>
                </li>
            </ul>
        </div>
    </UiDialog>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop'
import { useRouter } from 'vue-router';
import services from '~category/lib/services';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const selectedCategory = ref(null);
const shop = useShopStore();
const { shopData, showCategoryModal } = storeToRefs(shop);

const { data: activeCategory } = useLazyAsyncData('nestedCategory', async () => await services.getCategoryNested(shopData.value.eng_name), {
    transform: (data) => {
        return data.data?.length > 0 && data.data?.filter((c) => c.is_active)
    }
});

function selectCategoryHandler(category) {
    if(category?.subcategories?.length > 0) {
        selectedCategory.value = category;
    }else {
        search(category?.pk)
    }
}

const search = (pk) => {
    var currentPath = router.currentRoute.value.path;
    var queryParams = router.currentRoute.value.query;
    emit('update:modelValue', false)
    setTimeout(()=> {
        delete queryParams.modal
        router.push({
        path: currentPath,
        query: { ...queryParams, category: pk}
    });
    }, 100)
    showCategoryModal.value = false;
};
</script>
