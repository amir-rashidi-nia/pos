<template>
    <UiDialog variant="mobile" :model-value="modelValue" @closed="$emit('update:modelValue', false)">
        <div class="relative w-full flex flex-col items-center justify-between px-4">
            <h3 class="text-xl leading-none pt-2 pb-4 font-bold">{{ strings[lang].buttonRegister }}</h3>
            <Form :validation-schema="schema" @submit="send" :dir="lang == 'fa' ? 'rtl' : 'ltr'" class="text-sm w-full flex flex-col gap-4">
                <div class="flex gap-2 w-full">
                    <UiVeeInput name="name" class="w-full"
                        :placeholder="strings[lang].placeholderShopName" inputmode="text" />
                    <UiVeeInput name="eng_name" class="w-full"
                        :placeholder="strings[lang].placeholderEnglishShopName"
                        inputmode="text" />
                </div>
                <UiVeeInput name="phone_number" class="w-full" :max-length="11"
                    :placeholder="strings[lang].numInpPlaceholder" inputmode="numeric" />
                <div class="w-full">
                    <div class="w-full h-60 bg-white rounded-lg overflow-hidden">
                        <BaseMapSelect @sendData="sendDataHandler" />
                    </div>
                </div>
                <UiVeeTextarea name="address" v-model="formData.address"
                    :placeholder="strings[lang].descriptionInpPlaceholder" class="w-full">
                </UiVeeTextarea>

                <UiButton type="submit" variant="secondary" class="w-full" :class="lang == 'fa' ? '' : 'pt-3'">
                    {{ strings[lang].buttonText }}
                </UiButton>
            </Form>
        </div>
    </UiDialog>
</template>
<script setup>
import { Form } from "vee-validate";
import { useToast } from 'vue-toastification';
import services from '~shop/lib/services';
import { object } from "yup";
import { registerShopValidator } from "~shop/lib/validator";
import { strings } from '~shop/lib/i18n';

const props = defineProps(['modelValue', 'lang'])
const emit = defineEmits(['update:modelValue'])
const formData = reactive({
    lat: '',
    lng: '',
    address: '',
})

const lang = toRef(props, 'lang')

// get data from map
function sendDataHandler(data) {
    formData.address = data?.address
    formData.lng = data?.coords.lng
    formData.lat = data?.coords.lat
}

const schema = object().shape(registerShopValidator);

const toast = useToast();
const loading = ref(false);
async function send(val) {
    try {
        loading.value = true;
        val.phone_number = val.phone_number.slice(1);
        val.lng = formData.lng;
        val.lat = formData.lat;
        const response = await services.registerShop(val)
        if (response.status === "ok") {
            toast(props.lang == 'fa' ? "فرم ارسال شد" : "form sended")
            emit('update:modelValue', false)
        }
    } catch (error) {
    } finally {
        loading.value = false;
    }
}
</script>