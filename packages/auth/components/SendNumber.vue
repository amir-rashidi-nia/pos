<template>
  <div class="w-full flex flex-col items-center text-sm pt-2">
    <h3 class="text-xl leading-none pb-6 font-bold">ورود</h3>
    <Form class="w-full flex flex-col items-center px-8" :validation-schema="schema" @submit="login" >
      <UiVeeInput 
        ref="input" 
        :max-length="11" 
        class="w-full" 
        type="tel"
        :tabindex="7" 
        name="phone_number"
        mode="numeric" 
        placeholder="e.g., 0912 345 6789" 
        label="شماره همراه خود را وارد فرمایید"
      />
      <UiButton type="submit" :loading="loading" class="mt-6 w-44">
        ورود
      </UiButton>
      <p class="text-[0.6rem] text-text-foreground dark:text-dark-text-foreground tracking-wide pt-2">
        Powered by busibuy
      </p>
    </Form>
  </div>
</template>
<script setup>
import { useAuthStore } from "~auth/stores/auth";
import { Form } from "vee-validate";
import { object } from "yup";
import { phoneNumberValidator } from "~auth/lib/validator";

const emit = defineEmits(['nextSlide'])
const props = defineProps(['step']);
const step = toRef(props, 'step');

const auth = useAuthStore();
const loading = ref(false);

const schema = object().shape({
  phone_number: phoneNumberValidator
});

async function login(val) {
  try {
    loading.value = true
    const response = await auth.sendOtp(val.phone_number)
    if (response?.status === "ok") {
      emit('nextSlide')
    }
  } catch(error){
    console.log(error)
  } finally{
    loading.value = false
  }
};

const input = ref(null);
watch(() => step.value,
    (slide) => {
        if (slide == 'sendNumber') {
          input.value.focusInput()
        }
    }
);
</script>
