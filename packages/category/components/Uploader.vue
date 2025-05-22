<template>
    <div class="max-w-[400px] w-full relative border-2 h-32 overflow-hidden border-primary-foreground dark:border-dark-primary border-dashed rounded-lg p-6 mt-6">
        <input @change="imageFile" accept="image/*" type="file" class="absolute inset-0 w-full h-full opacity-0 z-50" />
        <div class="text-center py-2">
            <h3 class="text-xs font-medium">
                <label for="file-upload" class="relative cursor-pointer flex flex-col items-center gap-2">
                    <span>تصویر دسته بندی</span>
                    <SvgoImage name="Img" filled class="text-3xl mr-1 text-current-50" />
                </label>
            </h3>
        </div>
        <UiProgressbar v-if="!!progress && progress !== 100" :precent="progress" class="absolute inset-0 -top-12 m-auto z-50"/>
        <NuxtImg v-if="image" placeholder loading="lazy" :src="image" class="absolute inset-0 w-full h-full z-30 object-cover" id="preview"/>
        <NuxtImg v-else-if="file" placeholder loading="lazy" :src="file" class="absolute inset-0 w-full h-full z-30 object-cover" id="preview"/>
    </div>
</template>
<script setup>
const props = defineProps(['file', 'progress']);
const emit = defineEmits(['sendFile']);

const image = ref(null)
const progress = toRef(props, 'progress');

async function imageFile(el) {
    const reader = new FileReader();
    reader.readAsDataURL(el.target.files[0]);
    reader.onloadend = (async() => {
        image.value = reader.result.toString();
        emit('sendFile', el.target.files[0]);
    })
}
</script>