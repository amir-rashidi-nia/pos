import { useAuthBaseStore } from "~base/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authBase = useAuthBaseStore();
  const { isLogin } = storeToRefs(authBase);
  console.log(isLogin.value)

  if (!isLogin.value) {
    return navigateTo("/login");
  }
});
