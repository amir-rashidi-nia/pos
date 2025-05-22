<template>
    <li class="w-full bg-primary-foreground dark:bg-dark-primary rounded-md">
        <details :class="`group ${category.name} w-full block appearance-none`">
            <summary
                class="flex outline-none list-none w-full appearance-none items-center justify-between gap-2 p-2 font-medium  marker:content-none hover:cursor-pointer">
                <div class="w-full flex items-center justify-between gap-2">
                    <span class="flex gap-2">
                        <SvgoActiveCategory v-if="category.is_active" />
                        <SvgoCategory v-else name="Category" />
                        <span>
                            {{ category.name }}
                        </span>
                    </span>
                    <button @click="editCategoryHandler(category)" class="text-sm text-brand">ویرایش</button>
                </div>
                <SvgoChevronDown v-if="category.subcategories && category.subcategories.length > 0" filled :class="`group-open:rotate-0`" class="transition rotate-90"/>
            </summary>
            <article v-if="category.subcategories && category.subcategories.length > 0" class="pr-4 pb-4 w-full appearance-none">
                <ul class="flex flex-col gap-4 pl-2 mt-4 w-full appearance-none">
                    <CategoryItem class="flex gap-2" v-for="subCategory in category.subcategories" :key="subCategory.pk" :category="subCategory" @edit="editCategoryHandler" />
                </ul>
            </article>
        </details>
    </li>
</template>
<script setup>
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['edit']);
function editCategoryHandler(category) {
    emit('edit', category);
}
</script>