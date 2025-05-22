import { defineStore, storeToRefs } from "pinia";
import { useShopStore } from "~base/stores/shop";
import { useAuthBaseStore } from "~base/stores/auth";
import services from "~auth/lib/services";

export const useAuthStore = defineStore("auth", () => {

  const phoneNumber = ref(null)
  
  const shop = useShopStore();
  const authBase = useAuthBaseStore();
  const { shopData } = storeToRefs(shop);
  const { user } = storeToRefs(authBase);
  
  async function sendOtp(phone_number) {
    try {
      const data = await services.sendNumberOTP(phone_number.slice(1), shopData.value.pk)
      if (data.status === "ok") {
        phoneNumber.value = phone_number;
        return data;
      }
    } catch (error) {
      throw error
    }
  }

  async function verifyNumber(otp) {
    try {
      const data = await services.verifyOtpNumber(phoneNumber.value.slice(1), shopData.value.pk, otp)
      if (data.status === "ok") {
        user.value = { ...data.data };
        return data;
      }
    } catch (error) {
      throw error
    }
  }

  return {
    phoneNumber,
    sendOtp,
    verifyNumber,
  };
});