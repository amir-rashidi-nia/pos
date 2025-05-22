import { useAuthBaseStore } from "~base/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authBase = useAuthBaseStore();
  const { isLogin } = storeToRefs(authBase);
  if (!isLogin.value) {
    return navigateTo("/?forLogin=1");
  }
});
