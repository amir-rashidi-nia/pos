<template>
    <div class="relative">
        <div ref="slider"
            :class="['flex relative gap-2 flex-none pr-4 w-full overflow-x-scroll no-scrollbar duration-300 transition-all', modelValue ? 'h-8 mb-4' : 'h-0 mb-0']">
            <CategoryTagItem :active="!route.query.tags" @click="searchAll" class="">همه</CategoryTagItem>
            <CategoryTagItem class="last:ml-4" v-for="tag in shopTags" :key="tag.pk"
                :active="route?.query?.tags?.split(',')?.includes(String(tag?.pk))"
                @click.prevent="search(String(tag?.pk))">
                {{ tag?.name }}
            </CategoryTagItem>
        </div>
        <button v-if="modelValue" @click="scrollLeft"
            class="absolute hidden md:flex items-center justify-center inset-y-0 my-auto h-5 w-5  left-2 z-50 p-2 bg-primary-foreground dark:bg-dark-primary-foreground text-white rounded-full">
            ←
        </button>
        <button v-if="modelValue" @click="scrollRight"
            class="absolute hidden md:flex items-center justify-center inset-y-0 my-auto h-5 w-5 right-2 z-50 p-2 bg-primary-foreground dark:bg-dark-primary-foreground text-white rounded-full">
            →
        </button>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import services from '~category/lib/services'
import { useShopStore } from '~base/stores/shop';

defineProps({
    modelValue: {
        type: Boolean,
        default: true
    }
})
const shop = useShopStore();
const { shopData } = storeToRefs(shop);

const emit = defineEmits(['update:modelValue'])
const slider = ref(null);

const route = useRoute()
const router = useRouter()
const tags = ref(route.query.tags ? route.query.tags.split(',') : [])
const shopTags = ref(null);


async function getTags(categoryId = 0) {
    try {
        const data = await services.getTag(shopData.value.eng_name, categoryId)
        if (data.status === "ok") {
            shopTags.value =  data.data;
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await router.isReady()
    let category = route.query.category ? route.query.category : '0'
    if (route.params.categoryId) {
        category = route.params.categoryId
    }
    await getTags(category)
})

watch(() => route.query.tags, () => {
    tags.value = route.query.tags ? route.query.tags.split(',') : []
})

// when category for seach change , all tags delete
watch(() => route.query.category, async () => {
    tags.value = []
    searchAll()
    await getTags(route.query.category)
})

// when click on 'همه' tag all tag query and q(query for seach input) deleted
const searchAll = () => {
    var currentPath = router.currentRoute.value.path;
    var queryParams = router.currentRoute.value.query;
    return navigateTo({
        path: currentPath,
        query: { ...queryParams, tags: undefined, q: undefined }
    });
}

// when click on each tags , added other tags beafor selected
const search = (pk) => {
    var currentPath = router.currentRoute.value.path;
    var queryParams = router.currentRoute.value.query;
    // if tag selected before and we click on it , it will be deselected
    if (tags.value.includes(pk)) {
        const index = tags.value.indexOf(pk);
        tags.value.splice(index, 1);
    } else {
        tags.value.push(pk)
    }
    // finally insert tags to url and delete q(query for seach input)
    return navigateTo({
        path: currentPath,
        query: { ...queryParams, tags: tags.value.join(","), q: undefined }
    });
}

function scrollLeft() {
    slider.value.scrollBy({ left: -200, behavior: 'smooth' });
}
function scrollRight() {
    slider.value.scrollBy({ left: 200, behavior: 'smooth' });
}
</script>