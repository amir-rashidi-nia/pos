import { useAuthBaseStore } from "~base/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authBase = useAuthBaseStore();
  const { isLogin } = storeToRefs(authBase);
  console.log(to)

  if (!isLogin.value) {
    return navigateTo("/login");
  }
});
