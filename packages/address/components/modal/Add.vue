<template>
    <UiDialog variant="mobile" :model-value="modelValue" @closed="$emit('update:modelValue', false)" close="none">
        <div dir="rtl" class="relative z-10 flex flex-col items-center justify-between">
            <h3 class="sticky z-20 w-full border-b-[0.75px] border-primary-foreground bg-primary pb-3 pt-1 text-center text-[1.06rem] font-semibold sm:top-0 sm:pt-4 dark:border-dark-primary dark:bg-dark-primary-foreground">
                افزودن آدرس
            </h3>
            <div class="flex w-full flex-col items-center gap-3">
                <div class="relative h-80 w-full">
                    <BaseMapSelect @send-data="sendDataHandler" />
                </div>
                <div class="relative w-full pb-2 px-4">
                    <label> آدرس </label>
                    <textarea v-model="formData.address"
                        class="w-full h-16 text-sm resize-none appearance-none border-b border-primary-foreground dark:border-dark-primary bg-transparent p-1 outline-none focus:border-b focus:border-dark-primary dark:focus:border-primary">
                    </textarea>
                </div>
                <div class="px-8 w-full">
                    <UiButton class="w-full dark:text-dark-text text-text" @click="add">تایید</UiButton>
                </div>
            </div>
        </div>
    </UiDialog>
</template>
<script setup>
import userService from "~address/lib/services";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", 'updateAddress']);

const formData = reactive({
    lat: null,
    lng: null,
    address: "",
});

function sendDataHandler(data) {
    formData.address = data?.address;
    formData.lng = data?.coords.lng;
    formData.lat = data?.coords.lat;
}

async function add() {
    try {
        const response = await userService.addUserAddress(
            formData.address,
            formData.lat,
            formData.lng,
        );
        if (response.status === "success") {
            emit('updateAddress')
            emit("update:modelValue", false);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>