<template>
    <div class="flex gap-2 items-center sm:gap-8 lg:gap-8 xl:gap-9 pb-4 w-full">
        <button @click.prevent="$emit('action')" :loading="loading" class="text-lg ml-auto text-brand">{{ btnTitle }}</button>
        <p class="text-lg mr-4 font-bold">{{ title }}</p>
        <button @click.prevent.self.stop="backHandler">
            <SvgoBack class="flex-none text-2xl pointer-events-none"  name="Back"></SvgoBack>
        </button>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    btnTitle: {
        type: String,
        required: false,
    },
    loading: {
        required: false
    },
    to: {
        type: String,
        required: false,
    }
});
defineEmits(["action"]);
const router = useRouter()
function backHandler () {
    return props.to ? navigateTo(props.to) : router.back()
}
</script>