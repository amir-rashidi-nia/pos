import { storeToRefs } from "pinia";
import { useAuthBaseStore } from "~base/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authBase = useAuthBaseStore();
  const { forPurchase, showEnterModal, user } = storeToRefs(authBase);
  if (to.query.forLogin == 1 && user.value) {
    forPurchase.value = false;
    showEnterModal.value = true;
  }
});
