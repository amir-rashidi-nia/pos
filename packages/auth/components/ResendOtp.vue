<template>
    <button type="button" class="text-sm" :disabled="!counting || loading">
        <vue-countdown ref="counter" class="text-[.63rem]" v-if="counting" :time="60000" @end="onCountdownEnd" v-slot="{ totalSeconds }">
            ارسال مجدد {{ totalSeconds }} ثانیه دیگر
        </vue-countdown>
        <p v-else @click.prevent="resend" class="text-[.63rem] cursor-pointer text-brand">
            ارسال مجدد
        </p>
    </button>
</template>
<script setup>
import VueCountdown from "@chenfengyuan/vue-countdown";
import { storeToRefs } from 'pinia';
import { useAuthBaseStore } from '~base/stores/auth';
import { useAuthStore } from "~auth/stores/auth";

const auth = useAuthStore();
const { phoneNumber } = storeToRefs(auth)
const counting = ref(false)
function startCountdown() {
    counting.value = true
}
function onCountdownEnd() {
    counting.value = false
}

const loading = ref(false)
async function resend() {
    try {
        loading.value = true;
        const response = await auth.sendOtp(phoneNumber.value);
        if (response?.status === "ok") {
            startCountdown()
      } 
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}
defineExpose({
    onCountdownEnd,
    startCountdown,
    counting
})
</script>