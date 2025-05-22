export default defineNuxtRouteMiddleware((to, from) => {
  const { hostname } = useRequestURL();
  const isBusiBuy = useSplitHostname(hostname);
  if (!['/test', '/404'].includes(to.path) && !isBusiBuy) {
    return navigateTo("/404");
  }
}); 
