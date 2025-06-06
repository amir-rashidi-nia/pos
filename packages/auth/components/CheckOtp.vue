<template>
    <Form :validation-schema="schemaOTP" @submit="verify" class="w-full flex flex-col items-center text-sm pt-3">
        <h3 class="text-xl leading-none pb-8 font-bold">کد تایید</h3>
        <p class="text-center items-center pb-2">
            کد ۴ رقمی ارسالی را وارد کنید.
            <span class="px-1 pt-1 text-brand block text-xs">
                {{ auth?.phoneNumber }}
            </span>
        </p>
        <UiVeeInput 
            ref="otpInput" 
            :max-length="4" 
            :tabindex="5"
            :center="true" 
            class="max-w-40 py-3 text-center" 
            @keyup.prevent="submitHandler"
            name="otp"
            mode="numeric" 
            placeholder="کد ارسالی" />
        <div class="w-full pt-4 flex flex-col items-center">
            <button ref="submit" type="submit"  class="hidden"></button>
            <p class="text-[0.6rem] text-center pb-1 items-center cursor-pointer text-text-foreground dark:text-dark-text-foreground">
                آیا شماره همراه شما اشتباه است؟
                <span @click.prevent="emit('prevSlide')" class="text-brand pb-6 text-[0.6rem]text-center items-center">
                    ویرایش
                </span>
            </p>
            <AuthResendOtp ref="counter" />
            <button ref="submit" type="submit"  class="hidden"></button>
        </div>
    </Form>
</template>
<script setup>
import { Form } from "vee-validate";
import { object } from "yup";
import { storeToRefs } from 'pinia';
import { useAuthBaseStore } from '~base/stores/auth';
import { useAuthStore } from '~auth/stores/auth';
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { otpValidator } from "~auth/lib/validator";

const emit = defineEmits(['prevSlide', 'nextSlide']);
const props = defineProps(['step']);
const step = toRef(props, 'step');

const toast = useToast()

const authBase = useAuthBaseStore();
const auth = useAuthStore();
const { forPurchase, user, showEnterModal } = storeToRefs(authBase);

const schemaOTP = object().shape({
    otp: otpValidator
});

const route = useRoute();
const loading = ref(false);

const submit = ref(null);
function submitHandler(event) {
    if (event.target?.value?.length == 4){
        submit.value.click();
    }
}

async function verify(val) {
	if(loading.value) return
    loading.value = true;
    try {
        const response = await auth.verifyNumber(val.otp);
        if (response?.status === "ok") {
            const token = useCookie('token');
            token.value = response?.data.token;
            if (user.value.is_owner) {
                return navigateTo('/')
            }
        }
    } catch (error) {
        toast(error);
    } finally{
        loading.value = false;
    }
}

const otpInput = ref(null);
const counter = ref(null);
watch(() => step.value,
    (slide) => {
        if (slide == 'checkNumber') {
            otpInput.value.focusInput()
        }

        if (!counter.value?.counting) {
            counter.value?.startCountdown()
        } else {
            counter.value?.onCountdownEnd()
        }
    }
);
</script>
