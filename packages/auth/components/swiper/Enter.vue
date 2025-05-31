<template>
        <div class="w-full flex items-center justify-center">
                <AuthSendNumber v-show="step == 'sendNumber'" :step="step" @nextSlide="step = 'checkNumber'" />
                <AuthCheckOtp v-show="step == 'checkNumber'" :step="step" @nextSlide="step = 'sendName'" @prevSlide="step = 'sendNumber'" />
        </div>
</template>
<script setup>
const step = ref('sendNumber');
</script>
