import { defineStore, storeToRefs } from "pinia";

import { useShopStore } from "./shop";
import authService from "~base/services/auth.service";
import { useCartStore } from '~base/stores/shopCart';

export const useAuthBaseStore = defineStore("authBase", () => {
  const user = ref(null);
  const forPurchase = ref(false);
  const showEnterModal = ref(false);
  const showEditNumberModal = ref(false);
  const isLogin = computed(() => !!user.value?.is_owner);

  const shop = useShopStore();
  const { shopData } = storeToRefs(shop);

  const cart = useCartStore();
  const { carts } = storeToRefs(cart);

  async function getInfo(shop = shopData.value.eng_name) {
    const data = await authService.getUserInfo(shop);
    if (data.status === "ok") {
      user.value = data.data;
      return data;
    }
  }

  async function logout() {
    // await useFetch.post(`${baseUrl}user/logout/`);
    carts.value = {};
    user.value = null;
    await navigateTo("/");
  }
 
  return {
    user,
    isLogin,
    getInfo,
    logout,
    forPurchase,
    showEnterModal,
    showEditNumberModal
  };
});
